import { DateTime } from 'luxon'
import { BaseModel, beforeSave, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
import slug from 'slug'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public parentId: number

  @column()
  public title: string

  @column()
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

  @beforeSave()
  @beforeUpdate()
  public static async assignMetaTitle(menu: Menu){
    menu.meta_title = slug(menu.title)
  }

}
