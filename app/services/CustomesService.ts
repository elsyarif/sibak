import Database from "@ioc:Adonis/Lucid/Database"
import Customer from "App/Models/Customer"

class CustomesService{
    private table = 'customers'

    public async create(data){
        const customer = new Customer()
        customer.name = data.name
        customer.email = data.email
        customer.address = data.address
        customer.phone = data.phone

        return await customer.save()
    }

    public async findAll(page = 1, limit = 10){
        return await Database.from(this.table).paginate(page, limit)
    }

    public async findOne(id){
        return await Customer.findOrFail(id)
    }

    public async update(id, data){
        const customer = await this.findOne(id)
        customer.name = data.name
        customer.email = data.email
        customer.address = data.address
        customer.phone = data.phone

        return await customer.save()
    }

    public async remove(id){
        const customer = await this.findOne(id)
        return await customer.delete()
    }
}

export default new CustomesService