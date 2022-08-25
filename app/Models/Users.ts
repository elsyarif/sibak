import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
    column,
    beforeSave,
    BaseModel,
    beforeCreate,
    belongsTo,
    BelongsTo,
    hasMany,
    HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import Role from "./Role";
import UserGroup from "./UserGroup";
import Category from "./Category";
import Product from "./Product";
import UserPermission from "./UserPermission";

export default class Users extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public username: string;

    @column()
    public email: string;

    @column({ serializeAs: null })
    public password: string;

    @column()
    public rememberMeToken?: string;

    @column()
    public roleId: string;

    @belongsTo(() => Role, {
        foreignKey: "roleId",
    })
    public role: BelongsTo<typeof Role>;

    @column()
    public groupId: string;

    @belongsTo(() => UserGroup, {
        foreignKey: "groupId",
    })
    public group: BelongsTo<typeof UserGroup>;

    @column()
    public isActive: boolean;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => Category,{
        foreignKey: "createdBy"
    })
    public category: HasMany<typeof Category>

    @hasMany(() => Product, {
        foreignKey: "createdBy",
    })
    public product: HasMany<typeof Product>;

    @hasMany(() => UserPermission, {
        foreignKey: "userId",
    })
    public UserPermissions: HasMany<typeof UserPermission>;

    @beforeCreate()
    public static async assignUuid(user: Users) {
        user.id = uuid();
    }

    @beforeSave()
    public static async hashPassword(users: Users) {
        if (users.$dirty.password) {
            users.password = await Hash.make(users.password);
        }
    }
}
