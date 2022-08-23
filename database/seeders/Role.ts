import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await Role.createMany([
      {
        id: "c5f41b33-0a92-4aee-b728-ff9758ef835f",
        name: 'Admin',
        description: 'Administrator'
      },
      {
        id: "4015650a-be59-4cd9-b1c8-d9acd11b8315",
        name: 'User',
        description: 'User'
      },
    ])
  }
}
