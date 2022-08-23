import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class ProductVarian extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public productId: string

  @column()
  public sku: string

  @column()
  public type: string

  @column()
  public name: string

  @column()
  public model: string

  @column()
  public price: number

  @column()
  public cost: number

  @column()
  public stock: number

  @column()
  public minimum: number

  @column()
  public unit: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product, {
    foreignKey: "productId"
  })
  public product: BelongsTo<typeof Product>
}
