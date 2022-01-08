import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostTags extends BaseSchema {
  protected tableName = 'post_tag'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id').unsigned().references('posts.id').onDelete('cascade')
      table.integer('tag_id').unsigned().references('tags.id').onDelete('cascade')
      table.unique(['post_id', 'tag_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
