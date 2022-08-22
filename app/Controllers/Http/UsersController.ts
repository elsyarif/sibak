import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UsersController {

    public async profile({auth, response}: HttpContextContract){
        const id = await auth.user?.id

        const user = await UserService.profile(id)

        response.ok({
            statusCode: 200,
            message: 'User profile success',
            data: user
        })
    }

    public async updateProfile({}: HttpContextContract){}

    public async assignUserPermission({}: HttpContextContract){}

    public async getUserGroup({response}: HttpContextContract){

        const usergroup = await UserService.getUserGroup()

        response.ok({
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
