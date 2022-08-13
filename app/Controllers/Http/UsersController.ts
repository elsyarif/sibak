import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async profile({}: HttpContextContract){}

    public async updateProfile({}: HttpContextContract){}

    public async assignUserPermission({}: HttpContextContract){}
}
