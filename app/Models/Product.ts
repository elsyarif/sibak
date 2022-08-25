import { DateTime } from "luxon";
import {
    BaseModel,
    beforeCreate,
    beforeSave,
    beforeUpdate,
    BelongsTo,
    belongsTo,
    column,
    HasMany,
    hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import slug from "slug";
import Category from "./Category";
import Users from "./Users";
import ProductVarian from "./ProductVarian";

export default class Product extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public code: string;

    @column()
    public title: string;

    @column()
    public slug: string;

    @column()
    public image: string;

    @column()
    public brand: string;

    @column()
    public views: number;

    @column()
    public description: number;

    @column()
    public status: string;

    @column()
    public categoryId: number;

    @column()
    public createdBy: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @belongsTo(() => Category, {
        foreignKey: "categoryId",
    })
    public category: BelongsTo<typeof Category>;

    @belongsTo(() => Users, {
        foreignKey: "createdBy",
    })
    public created: BelongsTo<typeof Users>;

    @hasMany(() => ProductVarian, {
        foreignKey: "productId"
    })
    public variant: HasMany<typeof ProductVarian>;

    @beforeCreate()
    public static async assignUuid(product: Product) {
        product.id = uuid();
    }

    @beforeSave()
    @beforeUpdate()
    public static async assignMetaTitle(product: Product) {
        product.slug = slug(product.title);
    }

    // @beforeSave()
    // public static async viewsIncrement(product: Product) {
    //     product.views = product?.views ? 0 : +1
    // }
}
