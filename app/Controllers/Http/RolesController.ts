import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleService from 'App/Services/RoleService'
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {

    public async create({request, response}: HttpContextContract){
        const payload = await request.validate(RoleValidator)
        const result = await RoleService.create(payload)

        response.created({
            statusCode: 201,
            message: "role created",
            data: result
        })
    }

    public async findAll({response}: HttpContextContract){
        const role = await RoleService.findAll()

        response.ok({
            statusCode: 200,
            message: 'all role',
            data: role
        })
    }

    public async findOne({ params, response}: HttpContextContract){
        const id = params.id
        const role = await RoleService.findOne(id)

        response.ok({
            statusCode: 200,
            message: 'get one role',
            data: role
        })
    }

    public async update({params, request, response}: HttpContextContract){
        const id = params.id
        const payload = await request.validate(RoleValidator)

        const role = await RoleService.update(id, payload)

        response.ok({
            statusCode: 200,
            message: 'update role success',
            data: role
        })
    }

    public async remove({params, response}: HttpContextContract){
        const id = params.id
        const role = await RoleService.remove(id)

        response.ok({
            statusCode: 200,
            message: 'delete role success',
            data: role
        })
    }
}
