import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionService from 'App/Services/PermissionService'

export default class PermissionsController {

    public async findAll({response}: HttpContextContract){
        const permission = await PermissionService.findAll()
        
        response.ok({
            statusCode: 200,
            message: 'all role',
            data: permission
        })
    }
}
