import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MenuService from 'App/services/MenuService'
import CreateMenuValidator from 'App/Validators/CreateMenuValidator'

export default class MenusController {

    public async create({request, response, i18n}: HttpContextContract){
        const {...data} = request.body()

        try {
            await request.validate(CreateMenuValidator)
            const menu = await MenuService.createMenu(data)

            response.created({
                statusCode: 201,
                message: i18n.formatMessage('menu.create'),
                data: menu
            })
        } catch (error) {

        }

    }

    public async findAll({request, response, i18n}: HttpContextContract){}

    public async update({request, response, params, i18n}: HttpContextContract){}

    public async inActiveMenu({request, response, params, i18n}: HttpContextContract){}

    public async assignRoleMenu({request, response, i18n}: HttpContextContract){}

    public async removeRoleMenu({request, response, params, i18n}: HttpContextContract){}

    public async roleMenu({request, response, i18n}: HttpContextContract){}
}
