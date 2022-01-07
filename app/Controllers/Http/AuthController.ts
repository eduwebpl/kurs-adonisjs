import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from "App/Validators/UserValidator";
import User from "App/Models/User";

export default class AuthController {
  public showRegister({ view }: HttpContextContract) {
    return view.render('auth/register');
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const user = await request.validate(UserValidator)

    const newUser = await User.create(user)

    await auth.login(newUser)

    return response.redirect().toRoute('/')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()

    return response.redirect().toRoute('/')
  }
}
