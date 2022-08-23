import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_menus'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table.integer('menu_id').unsigned().references('menus.id').onDelete('CASCADE')
      table.unique(['role_id', 'menu_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
