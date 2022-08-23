import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Customer from 'App/Models/Customer'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Customer.create({
      name: "Umum",
      email: "umum@email.com",
      address: "umum",
      phone: "12345",
    })
  }
}
