import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Hash from '@ioc:Adonis/Core/Hash';
import Users from 'App/Models/Users';
import { v4 as uuid } from 'uuid';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Users.create(
        {
            id: uuid(),
            name: 'syarif',
            username: 'syarif',
            email: 'syarif@gmail.com',
            password: await Hash.make('123455'),
            isActive: true,
        }
    )
  }
}
