import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application';
import Drive from '@ioc:Adonis/Core/Drive'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import EditFilename from 'App/utils/EditFilename';
import ProductService from 'App/Services/ProductService';
import UpdateProductValidator from 'App/Validators/UpdateProductValidator';

export default class ProductsController {
    protected storage = "images/products/"

    public async create({request, response, auth}: HttpContextContract){
        const userId = auth.user?.id
        const payload = await request.validate(CreateProductValidator)

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
                const product = await ProductService.create(userId, {...payload, image: this.storage+filename})

                response.created({
                    statusCode: 201,
                    message: "product created success",
                    data: product
                })
            } catch (error) {
                await this.removeImage(this.storage+filename)
                    response.badRequest({
                        message: "product created failed",
                        error: error.message
                    })
            }
        }
    }

    public async findAll({response}: HttpContextContract){
        const product = await ProductService.findAll()

        response.ok({
            statusCode: 200,
            message: "find all product success",
            data: product
        })
    }

    public async findOne({params, response}: HttpContextContract){
        const product = await ProductService.findOne(params.id)

        response.ok({
            statusCode: 200,
            message: "find one product success",
            data: product
        })

    }

    public async findBySlug({params, response}: HttpContextContract){
        const product = await ProductService.findSlug(params.slug)

        response.ok({
            statusCode: 200,
            message: "find one product success",
            data: product
        })
    }

    public async getProduct({ request, response }: HttpContextContract){
        const keyword = request?.requestData.search
        console.log(keyword)
        let product
        if(!keyword){
            product = await ProductService.findAllByParams(keyword)
        }else{
            product = await ProductService.getProduct()
        }

        response.ok({
            statusCode: 200,
            message: "get product success",
            data: product
        })
    }

    public async update({params, request, response}: HttpContextContract){
        const id = params.id
        const old = await ProductService.findOne(id)
        const payload = await request.validate(UpdateProductValidator)

        if(payload.image){
            const filename = await EditFilename.rename(payload.image.clientName)

            await payload.image?.move(Application.tmpPath('uploads/'+this.storage), {
                name: filename,
                overwrite: true
            })

            if(payload.image?.isValid && payload.image?.state === "moved"){
                try {
                    const product = await ProductService.update(id,{...payload, image: this.storage+filename})
                    await this.removeImage(old.image)

                    return response.ok({
                        message: "product updated success",
                        data: product
                    })
                } catch (error) {
                    await this.removeImage(this.storage+filename)
                    return response.badRequest({
                        message: "product updated failed",
                        error: error.message
                    })
                }
            }
        }

        const product = await ProductService.update(id, payload)

        response.ok({
            statusCode: 200,
            message: "Update product success",
            data: product
        })
    }

    public async remove({params, response}: HttpContextContract){
        const old = await ProductService.findOne(params.id)
        const product = await ProductService.remove(params.id)
        await this.removeImage(old.image)

        response.ok({
            statusCode: 200,
            message: "delete product success",
            data: product
        })
    }

    public async search({request, response}: HttpContextContract){
        const keyword = request

        response.ok(
            keyword
        )
    }

    private async removeImage(location){
        await Drive.delete(location)
    }

    // variant
}
