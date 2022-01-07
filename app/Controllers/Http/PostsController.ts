import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from "App/Models/Post";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

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
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.minLength(10)
      ]),
      content: schema.string({}, [
        rules.minLength(20)
      ])
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Tytuł wpisu jest wymagany',
        'title.minLength': 'Tytuł musi zawierać minimum 10 znaków',
        'content.required': 'Treść wpisu jest wymagana',
        'content.maxLenght': 'Treść nie może być dłuższa niż 255 znaków',
      }
    })

    await Post.create({
      title: validatedData.title,
      content: validatedData.content
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

  public async destroy({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    return response.redirect().toRoute('home')
  }
}
