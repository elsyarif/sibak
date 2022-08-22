import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid }from 'uuid'
import Role from './Role'
import UserGroup from './UserGroup';

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @column()
  @belongsTo(() => UserGroup, {
    localKey: 'id',
    foreignKey: 'id'
  })
  public group: BelongsTo<typeof UserGroup>

  @column()
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async assignUuid(user: Users){
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword (users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }
}
