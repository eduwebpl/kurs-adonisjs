import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from "App/Models/Tag";

export default class TagsController {
  public async show({ params, view }: HttpContextContract) {
    const tag = await Tag.findByOrFail('name', params.tag)
    await tag.preload('posts', query => query.preload('user'))

    return view.render('tags/tag', { tag })
  }
}
