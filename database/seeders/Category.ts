import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Category.createMany([
      {
        id: 1,
        parent_id: 0,
        name: 'Makanan',
        image: "makanan.png",
        isActive: true
      },
      {
        id: 2,
        parent_id: 1,
        name: 'Bumbu & Bahan masakan',
        image: "bumbu.png",
        isActive: true
      },
      {
        id: 3,
        parent_id: 1,
        name: 'Makanan Ringan',
        image: "makanan-ringan.png",
        isActive: true
      },
      {
        id: 4,
        parent_id: 1,
        name: 'Makanan Beku',
        image: "makanan-beku.png",
        isActive: true
      },
      {
        id: 6,
        parent_id: 1,
        name: 'Makanan Kaleng',
        image: "makanan-kaleng.png",
        isActive: true
      },
      {
        id: 7,
        parent_id: 0,
        name: 'Minuman',
        image: "minuman.png",
        isActive: true
      },
      {
        id: 8,
        parent_id: 7,
        name: 'Minuman panas',
        image: "minuman-panas.png",
        isActive: true
      },
      {
        id: 9,
        parent_id: 7,
        name: 'Minuman dingin',
        image: "minuman-dingin.png",
        isActive: true
      },
    ])
  }
}
