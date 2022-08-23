import Database from "@ioc:Adonis/Lucid/Database"
import Supplier from "App/Models/Supplier"

class SupplierService{
    private table = 'suppliers'

    public async create(data){
        const supplier = new Supplier()
        supplier.name = data.name
        supplier.email = data.email
        supplier.address = data.address
        supplier.phone = data.phone

        return await supplier.save()
    }
    
    public async findAllByParams(keyword){
        return await Database.from(this.table).whereLike('name', keyword).orderBy('name')  
    }
    
    public async findAll(page = 1, limit = 10){
        return await Database.from(this.table).paginate(page, limit)
    }

    public async findOne(id){
        return await Supplier.findOrFail(id)
    }

    public async update(id, data){
        const supplier = await this.findOne(id)
        supplier.name = data.name
        supplier.email = data.email
        supplier.address = data.address
        supplier.phone = data.phone

        return await supplier.save()
    }

    public async remove(id){
        const customer = await this.findOne(id)
        return await customer.delete()
    }
}

export default new SupplierService