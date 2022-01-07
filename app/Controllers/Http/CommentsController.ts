import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class CommentsController {
  public async store({ request, response, view, auth, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.post_id)

    post.related('comments').create({
      // @ts-ignore
      user_id: auth.user.id,
      content: await request.input('comment')
    })

    return response.redirect().back()
  }
}
