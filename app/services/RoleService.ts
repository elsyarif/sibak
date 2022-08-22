import Database from "@ioc:Adonis/Lucid/Database"
import Role from "App/Models/Role"

class RoleService{
    private table = 'roles'

    public async create(data){
        const role = new Role()
        role.name = data.name
        role.description = data.description
        
        return await role.save()
    }

    public async findAll(page = 1, limit = 10){
        const role = await Database.from(this.table).paginate(page, limit)

        return role
    }

    public async findOne(id){
        return await Role.findByOrFail('id', id)
    }

    public async update(id, data){
        const role = await this.findOne(id)
        role.name = data.name
        role.description = data.description

        return await role.save()
    }

    public async remove(id){
        const role = await this.findOne(id)
        return await role.delete()
    }
}

export default new RoleService
