import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserGroup from '../../app/Models/UserGroup';
import { v4 as uuid } from 'uuid';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    UserGroup.createMany([
        {
            id: uuid(),
            name: 'Developer',
            description: 'Developer',
            isActive: true,
        },
        {
            id: uuid(),
            name: 'Administrator',
            description: 'Administrator',
            isActive: true
        }
    ])
  }
}
