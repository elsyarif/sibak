import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_varians'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.string('sku').notNullable().comment('code')
      table.string('type').comment('ex: Standard, non-inventory, serialize')
      table.string('name')
      table.string('model').comment('ex: size M, L, 28, default')
      table.decimal('price').defaultTo(0).notNullable().comment('Harga jual')
      table.decimal('cost').defaultTo(0).notNullable().comment('harga beli')
      table.integer('stock').defaultTo(0).notNullable()
      table.integer('minimum').defaultTo(0).notNullable().comment('minimum pembelian')
      table.string('unit').notNullable().comment('satuan')
      table.text('description')
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
