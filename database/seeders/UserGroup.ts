import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserGroup from '../../app/Models/UserGroup';

export default class UserGroupSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    UserGroup.createMany([
        {
            id: '5f60695d-9fc8-45c5-a2be-f9f0bce008c5',
            name: 'Developer',
            description: 'Developer',
            isActive: true,
        },
        {
            id: '66ec76b6-b390-4122-9a96-66467f9bdb6e',
            name: 'Administrator',
            description: 'Administrator',
            isActive: true
        }
    ])
  }
}
