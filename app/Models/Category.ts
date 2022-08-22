import { DateTime } from "luxon";
import {
    BaseModel,
    beforeSave,
    beforeUpdate,
    BelongsTo,
    belongsTo,
    column,
} from "@ioc:Adonis/Lucid/Orm";
import slug from "slug";
import Users from "./Users";

export default class Category extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public parent_id: number;

    @column()
    public name: string;

    @column()
    public slug: string;

    @column()
    public image: string;

    @column()
    public is_active: boolean;

    @belongsTo(() => Users)
    public created_by: BelongsTo<typeof Users>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @beforeSave()
    @beforeUpdate()
    public static async assignMetaTitle(category: Category) {
        category.slug = slug(category.name);
    }
}
