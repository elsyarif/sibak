import Database from "@ioc:Adonis/Lucid/Database"
import Category from "App/Models/Category"
import Users from "App/Models/Users"

class CategoryService{
    private table = 'categories'

    public async create(data){
        const user = await Users.findOrFail(data.userId)

        const category = new Category()
        category.parentId = data.parentId
        category.name = data.name
        category.image = data.image
        category.isActive = data.isActive
        
        await category.related('created').associate(user)
        return await category.save()
    }

    public async findAllByParams(keyword){
        return await Database.from(this.table).whereLike('name', keyword).orderBy('name')  
    }
    
    public async findAll(page = 1, limit = 10){
        return await Database.from(this.table).paginate(page, limit)
    }

    public async findSlug(id){
        return await Category.findByOrFail('slug', id)
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