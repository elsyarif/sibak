import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application';
import Drive from '@ioc:Adonis/Core/Drive'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator';
import EditFilename from '../../../utils/editFilename';
import CategoryService from 'App/Services/CategoryService';
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator';

export default class CategoriesController {
    protected storage = "images/categories/"

    public async create({request, response, auth}: HttpContextContract){
            const userId = auth.user?.id
            const payload = await request.validate(CreateCategoryValidator)

            const filename = await EditFilename.rename(payload.image.clientName)

            if(!payload.image?.isValid){
                return response.badRequest({
                    message: "upload failed",
                    error: payload.image.errors
                })
            }

            await payload.image?.move(Application.tmpPath('uploads/'+this.storage), {
                name: filename,
                overwrite: true
            })

            if(payload.image?.isValid && payload.image?.state === "moved"){
                try {
                    const category = await CategoryService.create({...payload, image: this.storage+filename, userId})
                    
                    response.ok({
                        message: "category created success",
                        data: category
                    })
                } catch (error) {
                    await this.removeImage(this.storage+filename)
                    response.badRequest({
                        message: "category created failed",
                        error: error.message
                    })
                }
            }
        
    }

    public async findAll({response}: HttpContextContract){
        const category = await CategoryService.findAll()

        response.ok({
            statusCode: 200,
            message: "find all category",
            data: category
        })
    }

    public async findOne({params, response}: HttpContextContract){
        const slug = params.slug
        const category = await CategoryService.findSlug(slug)

        response.ok({
            statusCode: 200,
            message: "find One category",
            data: category
        })
    }

    public async update({params, request, response}: HttpContextContract){
        const id = params.id
        const payload = await request.validate(UpdateCategoryValidator)
        const old = await CategoryService.findOne(id)
        // cek jika ada file gambar 
        if(payload.image){

            const filename = await EditFilename.rename(payload.image.clientName)

            await payload.image?.move(Application.tmpPath('uploads/'+this.storage), {
                name: filename,
                overwrite: true
            })

            if(payload.image?.isValid && payload.image?.state === "moved"){
                try {
                    const category = await CategoryService.update(id,{...payload, image: this.storage+filename})
                    await this.removeImage(old.image)

                    return response.ok({
                        message: "category updated success",
                        data: category
                    })
                } catch (error) {
                    await this.removeImage(this.storage+filename)
                    return response.badRequest({
                        message: "category updated failed",
                        error: error.message
                    })
                }
            }
        }

        const category = await CategoryService.update(id, payload)

        response.ok({
            statusCode: 200,
            message: "Update category success",
            data: category
        })
    }

    public async remove({params, response}: HttpContextContract){
        const old = await CategoryService.findOne(params.id)
        const category = await CategoryService.remove(params.id)
        await this.removeImage(old.image)

        response.ok({
            statusCode: 200,
            message: "delete category success",
            data: category
        })
    }

    private async removeImage(location){
        await Drive.delete(location)
    }
}
