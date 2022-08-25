import { DateTime } from "luxon";
import {
    BaseModel,
    beforeSave,
    beforeUpdate,
    BelongsTo,
    belongsTo,
    column,
    HasMany,
    hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import slug from "slug";
import Users from "./Users";
import Product from "./Product";

export default class Category extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public parentId: number;

    @column()
    public name: string;

    @column()
    public slug: string;

    @column()
    public image: string;

    @column()
    public isActive: boolean;

    @column()
    public createdBy: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
    
    @belongsTo(() => Users, {
        foreignKey: "createdBy"
    })
    public created: BelongsTo<typeof Users>;

    @hasMany(() => Product, {
        foreignKey: "categoryId"
    })
    public product: HasMany<typeof Product>

    @beforeSave()
    @beforeUpdate()
    public static async assignMetaTitle(category: Category) {
        category.slug = slug(category.name);
    }
}
