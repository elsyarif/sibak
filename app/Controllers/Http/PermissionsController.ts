import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionService from 'App/Services/PermissionService'
import PermissionValidator from 'App/Validators/PermissionValidator'

export default class PermissionsController {

    public async create({ request, response }: HttpContextContract){
        const payload = await request.validate(PermissionValidator)
        const permission = await PermissionService.create(payload)

        response.created({
            statusCode: 201,
            message: "permission created",
            data: permission
        })
    }

    public async findOne({params, response}: HttpContextContract){
        const permission = await PermissionService.findOne(params.id)
        
        response.ok({
            statusCode: 200,
            message: 'find one role',
            data: permission
        })
    }
    
    public async findAll({response}: HttpContextContract){
        const permission = await PermissionService.findAll()

        response.ok({
            statusCode: 200,
            message: 'all role',
            data: permission
        })
    }

    public async update({params, request, response}: HttpContextContract){
        const id = params.id
        const payload = await request.validate(PermissionValidator)

        const permission = await PermissionService.update(id, payload)

        response.ok({
            statusCode: 200,
            message: "permission update success",
            data: permission
        })
    }

    public async remove({params, response}: HttpContextContract){
        const id = params.id
        const permission = await PermissionService.remove(id)

        response.ok({
            statusCode: 200,
            message: "permission delete success",
            data: permission
        })
    }
}
