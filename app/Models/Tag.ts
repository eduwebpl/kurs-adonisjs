import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import {slugify} from "@ioc:Adonis/Addons/LucidSlugify";
import Post from "App/Models/Post";

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name']
  })
  public slug: string

  @column()
  public name: string

  @manyToMany(() => Post)
  public posts: ManyToMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
