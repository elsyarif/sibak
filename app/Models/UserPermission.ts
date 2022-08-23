import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Users from './Users';
import Permission from './Permission';
import Menu from './Menu';

export default class UserPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public permissionId: number

  @column()
  public menuId: number

  @column()
  public accessName: string

  @belongsTo(() => Users, {
    foreignKey: "userId"
  })
  public user: BelongsTo<typeof Users>

  @belongsTo(() => Permission, {
    foreignKey: "permissionId"
  })
  public permission: BelongsTo<typeof Permission>

  @belongsTo(() => Menu, {
    foreignKey: "menuId"
  })
  public menu: BelongsTo<typeof Menu>
}
