import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import { v4 as uuid } from 'uuid'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await Role.createMany([
      {
        id: uuid(),
        name: 'Admin',
        description: 'Administrator'
      },
      {
        id: uuid(),
        name: 'User',
        description: 'User'
      },
    ])
  }
}
