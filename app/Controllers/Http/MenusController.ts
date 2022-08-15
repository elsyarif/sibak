import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MenuService from 'App/services/MenuService'
import CreateMenuValidator from 'App/Validators/CreateMenuValidator'

export default class MenusController {
    private menuService = MenuService

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

    public async findAll({response, i18n}: HttpContextContract){
        const menu = this.menuService.findAll()

        response.ok({
            statusCode: 200,
            message: 'all menu',
            data: menu
        })
    }

    public async update({request, response, params, i18n}: HttpContextContract){
        const id = params.id
        const {...data} = request.body()

        try {
            // validate
            const menu = await this.menuService.update(id, data)
    
            response.ok({
                statusCode: 200,
                message: 'update success',
                data: menu
            })
        } catch (error) {
            response.badRequest({
                statusCode: 400,
                message: 'update error',
                error: error.message
            })
        }
    }

    public async inActiveMenu({request, response, params, i18n}: HttpContextContract){
        const id = params.id
        const {isActive} = request.body()

        try {
            // validate
            const menu = await this.menuService.inActiveMenu(id, isActive)

            response.ok({
                statusCode: 200,
                message: 'activate menu success',
                data: menu
            })

        } catch (error) {
            response.badRequest({
                statusCode: 400,
                message: 'activate men error',
                error: error.message
            })
        }

    }

    public async assignRoleMenu({request, response, i18n}: HttpContextContract){
        const {...data} = request.body()

        try {
            //validate
            const menu = await this.menuService.assignRoleMenu(data)
            response.created({
                statusCode: 201,
                message: 'Assign role menu success',
                data: menu
            })
        } catch (error) {

            response.badRequest({
                statusCode: 400,
                message: 'Assign role menu success',
                error: error.message
            })
        }
    }

    public async removeRoleMenu({response, params, i18n}: HttpContextContract){
        const id = params.id

        const menu = await this.menuService.removeRoleMenu(id)

        response.ok({
            statusCode: 201,
            message: 'Remove role menu success',
            data: menu
        })
    }

    public async roleMenu({auth, response, i18n}: HttpContextContract){
        // roleId
        const roleId = await auth.user?.role

        const menu = await this.menuService.roleMenus(roleId)

        response.ok({
            statusCode: 201,
            message: 'role menu list success',
            data: menu
        })
    }
}
