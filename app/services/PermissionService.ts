import Database from "@ioc:Adonis/Lucid/Database"
import Permission from "App/Models/Permission"

class Permissionervice{
    private table = 'permissions'

    public async create(data){
        const permission = new Permission()
        permission.name = data.name
        permission.description = data.description

        return permission.save()
    }

    public async findAll(page = 1, limit = 10){
        const permission = await Database.from(this.table).paginate(page, limit)

        return permission
    }

    public async findOne(id){
        return await Permission.findOrFail(id)
    }

    public async update(id, data){
        const permission = await this.findOne(id)
        permission.name = data.name
        permission.description = data.description

        return await permission.save()
    }

    public async remove(id){
        const permission = await this.findOne(id)
        return await permission.delete()
    }
}

export default new Permissionervice
