import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application';
import Drive from '@ioc:Adonis/Core/Drive'

export default class CategoriesController {
    protected storage = "images"

    public async create({request, response}: HttpContextContract){
        const image = request.file('image')

        if(image){
            await image.move(Application.tmpPath("uploads"))
        }
        response.ok({
            message: "Upload success",
            data: image
        })
    }

    public async getImage({params, response}: HttpContextContract){
        const filePath = `uploads/${params.image}`
        const isExist = await Drive.exists(filePath)
        console.log(isExist)

        if(isExist){
            return response.download(Application.tmpPath(filePath))
        }

        return response.notFound({
            message: "File does not exist "
        })
    }
}
