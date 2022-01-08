/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PostsController.index').as('home')

// Posts

Route.get('/posts/create-form', 'PostsController.create').middleware('auth').as('create-form')
Route.post('/posts/create-post', 'PostsController.store').as('create-post')
Route.get('/posts/update-post/:id', 'PostsController.edit').as('edit-post')
Route.put('/posts/update-post/:id', 'PostsCOntroller.update').as('update-post')
Route.delete('/posts/delete/:id', 'PostsController.destroy').as('delete-post')
Route.get('/posts/:slug', 'PostsController.show').as('show-post')

// Auth

Route.group(() => {
  Route.get('/login', 'AuthController.showLogin').as('show-login')
  Route.get('/register', 'AuthController.showRegister').as('show-register')
}).middleware('guest')

Route.post('/register', 'AuthController.register').as('register')
Route.post('/logout', 'AuthController.logout').as('logout')
Route.post('/login', 'AuthController.login').as('login')
Route.get('/edit-profile', 'AuthController.showEdit').middleware('auth').as('edit-profile')
Route.post('/edit-profile', 'AuthController.update').as('update-profile')

// Comments

Route.post('/posts/:post_id/comments', 'CommentsController.store').as('create-comment')

// Tags

Route.get('/tags/:tag', 'TagsController.show').as('tag')
