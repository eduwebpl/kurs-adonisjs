import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";

export default class PostsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 4

    const search = request.input('search')

    if(search) {
      const posts = await Post.query().where('title', 'like', `%${search}%`).paginate(page, limit)

      return view.render('welcome', { posts })
    }

    const posts = await Post.query().orderBy('id', 'desc').paginate(page, limit)

    return view.render('welcome', { posts })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts/createOrEdit')
  }

  public async store({ request, response }: HttpContextContract) {
    const post = await request.validate(CreatePostValidator)

    await Post.create(post)

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

  public async destroy({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    return response.redirect().toRoute('home')
  }
}
