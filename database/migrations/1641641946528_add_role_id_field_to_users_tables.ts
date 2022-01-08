import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Role from "Contracts/enums/Role";

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().defaultTo(Role.USER).after('id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role_id')
    })
  }
}
