import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleService from 'App/Services/RoleService'

export default class RolesController {
    
    public async findAll({response}: HttpContextContract){
        const role = await RoleService.findAll()
        
        response.ok({
            statusCode: 200,
            message: 'all role',
            data: role
        })
    }
}
