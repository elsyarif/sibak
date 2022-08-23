import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UsersController {

    public async profile({auth, response}: HttpContextContract){
        const id = await auth.user?.id

        const user = await UserService.profile(id)
        await user.load('group')
        await user.load('role')

        response.ok({
            statusCode: 200,
            message: 'User profile success',
            data: user
        })
    }

    public async updateProfile({}: HttpContextContract){}

    public async assignUserPermission({request, response}: HttpContextContract){
        const {user, permission, menu} = request.body()
        const assign = await UserService.assignUserPermission(user, permission, menu)

        response.created({
            statusCode: 201,
            message: "assign user permission success",
            data: assign
        })
    }

    public async assignUserRole({request, response, params}: HttpContextContract){
        const id = params.id
        const {...data} = request.body()

        const user = await UserService.assignUserRole(id, data)

        response.ok({
            statusCode: 200,
            message: 'assign user role success',
            data: user
        })
    }

    public async getUserGroup({response}: HttpContextContract){
        const usergroup = await UserService.getUserGroup()

        response.ok({
            statusCode: 200,
            message: 'User Group list',
            data: usergroup
        })
    }

    public async assignUserGroup({request, response, params, i18n}: HttpContextContract){
        const id = params.id
        const {...data} = request.body()

        const user = await UserService.assignUserGroup(id, data)

        response.ok({
            statusCode: 200,
            message: 'assign user group success',
            data: user
        })
    }
}
