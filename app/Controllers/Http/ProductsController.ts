import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
    
    public async create({request, response}: HttpContextContract){
        const payload = await request.validate(CreateProductValidator)

        response.created({
            statusCode: 201,
            message: "product created success",
            data: payload
        })
    }

    public async findAll({}: HttpContextContract){}

    public async findOne({}: HttpContextContract){}

    public async update({}: HttpContextContract){}
    
    public async remove({}: HttpContextContract){}

    public async search({}: HttpContextContract){}

    private async removeImage(location){
        await Drive.delete(location)
    }
}
