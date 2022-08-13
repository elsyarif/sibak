import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Users from './Users';
import Permission from './Permission';
import Menu from './Menu';

export default class UserPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Users)
  public userId: BelongsTo<typeof Users>

  @belongsTo(() => Permission)
  public permissioId: BelongsTo<typeof Permission>

  @belongsTo(() => Menu)
  public MenuId: BelongsTo<typeof Menu>

  @column()
  public accessName: string
}
