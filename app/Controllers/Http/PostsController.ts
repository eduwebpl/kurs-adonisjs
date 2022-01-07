import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from "App/Models/Post";

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all()

    return view.render('welcome', { posts })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts/createOrEdit')
  }

  public async store({ request, response }: HttpContextContract) {
    await Post.create({
      title: request.input('title'),
      content: request.input('content')
    })

    return response.redirect('/')
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findByOrFail('slug', params.slug)

    return view.render('posts/show', { post })
  }

  public async edit({ view, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return view.render('posts/createOrEdit', { post })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    post.merge({
      title: request.input('title'),
      content: request.input('content')
    })

    await post.save()

    return response.redirect('/')
  }

  public async destroy({}: HttpContextContract) {}
}
