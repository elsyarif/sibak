import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    Permission.createMany([
        {
            id:1,
            name: 'manage',
            description: 'Manage all resource'
        },
        {
            id:2,
            name: 'read',
            description: 'Read a data'
        },
        {
            id:3,
            name: 'create',
            description: 'Create a new data'
        },
        {
            id:4,
            name: 'update',
            description: 'Upadate a data'
        },
        {
            id:5,
            name: 'delete',
            description: 'Delete a data'
        },
    ])
  }
}
