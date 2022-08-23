import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('user_id').references('users.id')
      table.integer('permission_id').unsigned().references('permissions.id')
      table.integer('menu_id').unsigned().references('menus.id')
      table.string('access_name').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
