import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('slug').index('produc_slug').notNullable()
      table.string('image')
      table.string('brand')
      table.integer('views').defaultTo(0).notNullable()
      table.text('description')
      table.enum('status', ['DRAFT', 'PUBLISH', 'REVIEW']).defaultTo('DRAFT')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('created_by').references('id').inTable('users')
      table.unique(["slug"])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
