import { DateTime } from "luxon";
import {
    BaseModel,
    beforeCreate,
    beforeSave,
    column,
    HasMany,
    hasMany,
    ManyToMany,
    manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import Users from "./Users";
import Menu from "./Menu";

export default class Role extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public description: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => Users, {
        foreignKey: "roleId",
    })
    public users: HasMany<typeof Users>;

    @manyToMany(() => Menu, {
        localKey: "id",
        pivotTable: "role_menus",
        relatedKey: "id",
        pivotForeignKey: "role_id",
        pivotRelatedForeignKey: "menu_id",
    })
    public menus: ManyToMany<typeof Menu>;

    @beforeCreate()
    public static async assignUuid(role: Role) {
        role.id = uuid();
    }
}
