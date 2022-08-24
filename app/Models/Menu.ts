import { DateTime } from "luxon";
import {
    BaseModel,
    beforeSave,
    beforeUpdate,
    column,
    HasMany,
    hasMany,
    ManyToMany,
    manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import slug from "slug";
import Role from "./Role";
import UserPermission from "./UserPermission";

export default class Menu extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public parentId: number;

    @column()
    public title: string;

    @column()
    public meta_title: string;

    @column()
    public icon: string;

    @column()
    public link: string;

    @column()
    public sort: number;

    @column()
    public isActive: boolean;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @manyToMany(() => Role, {
        localKey: "id",
        pivotTable: "role_menus",
        relatedKey: "id",
        pivotForeignKey: "menu_id",
        pivotRelatedForeignKey: "role_id",
    })
    public roles: ManyToMany<typeof Role>;

    @hasMany(() => UserPermission, {
        foreignKey: "menuId",
    })
    public userPermission: HasMany<typeof UserPermission>;

    @beforeSave()
    @beforeUpdate()
    public static async assignMetaTitle(menu: Menu) {
        menu.meta_title = slug(menu.title);
    }
}
