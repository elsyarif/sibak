import Database from "@ioc:Adonis/Lucid/Database"
import Category from "App/Models/Category"

class CategoryService{
    private table = 'categories'

    public async create(data){
        const category = new Category()
        category.parent_id = data.parent_id
        category.name = data.name
        category.image = data.image
        category.isActive = data.isActive
        category.createdBy = data.createdBy

        await category.save()
    }

    public async findAll(page = 1, limit = 10){
        return await Database.from(this.table).paginate(page, limit)
    }

    public async findOne(id){
        return await Category.findOrFail(id)
    }

    public async update(id, data){
        const category = await this.findOne(id)
        category.name = data.name
        category.image = data.image
        category.isActive = data.isActive

        return await category.save()
    }

    public async remove(id){
        const category = await this.findOne(id)
        return await category.delete()
    }
}

export default new CategoryService