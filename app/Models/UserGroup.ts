import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid';
import Users from './Users';

export default class UserGroup extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public isActive: boolean

  @hasMany(() => Users, {
    foreignKey: 'groupId'
  })
  public users: HasMany<typeof Users>
  
  @beforeCreate()
  public static async assignUuid(group: UserGroup){
    group.id = uuid()
  }
}
