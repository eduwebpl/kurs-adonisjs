import {BasePolicy} from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Role from "Contracts/enums/Role";

export default class PostPolicy extends BasePolicy {
  public async before(user: User | null) {
    if(user?.roleId === Role.ADMIN) {
      return true
    }
  }

	public async create(user: User) {
    return user.roleId === Role.MODERATOR;
  }
	public async update(user: User, post: Post) {
    return post.userId === user.id;
  }
	public async delete(user: User, post: Post) {
    return post.userId === user.id;
  }
}
