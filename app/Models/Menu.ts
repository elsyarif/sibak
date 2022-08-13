import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'


export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public parentId: number

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
    allowUpdates: true,
  })
  public meta_title: string

  @column()
  public icon: string

  @column()
  public link: string

  @column()
  public sort: number

  @column()
  public isActive: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
