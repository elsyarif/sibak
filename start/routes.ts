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
| import './routes/customer'
|
*/
import { extname } from 'path'
import Route from '@ioc:Adonis/Core/Route'
import Drive from '@ioc:Adonis/Core/Drive'

// path
Route.group(() => {
    // route version
    Route.group(() => {

        // auth route
        Route.group(() => {
            Route.post('/login', 'AuthController.login')
            Route.post('/register', 'AuthController.register')
            Route.post('/refresh-token', 'AuthController.refresh')

            Route.group(() => {
                Route.delete('/logout', 'AuthController.logout')
            }).middleware('auth:jwt')
        }).prefix('/auth')

        // Guard by auth
        Route.group(() => {
            // users route
            Route.group(() => {
                Route.get('/profile', 'UsersController.profile')
                Route.post('/assign-permission', 'UsersController.assignUserPermission')
                Route.put('/:id/assign-group', 'UsersController.assignUserGroup')
                Route.put('/:id/assign-role', 'UsersController.assignUserRole')
            }).prefix('/users')

            // Role route
            Route.group(() => {
                Route.get('/', 'RolesController.findAll')
                Route.post('/', 'RolesController.create')
                Route.get('/:id', 'RolesController.findOne')
                Route.patch('/:id', 'RolesController.update')
                Route.delete('/:id', 'RolesController.remove')
            }).prefix('/roles')

            // Permission route
            Route.group(() => {
                Route.get('/', 'PermissionsController.findAll')
                Route.post('/', 'PermissionsController.create')
                Route.get('/:id', 'PermissionsController.findOne')
                Route.patch('/:id', 'PermissionsController.update')
                Route.delete('/:id', 'PermissionsController.remove')
            }).prefix('/permissions')

            // Menu route
            Route.group(() => {
                Route.get('/user-menu', 'MenusController.roleMenu')
                Route.get('/', 'MenusController.findAll')
                Route.post('/', 'MenusController.create')
                Route.put('/:id/set-status', 'MenusController.inActiveMenu')
                Route.patch('/:id', 'MenusController.update')
                Route.post('/assign-role-menu', 'MenusController.assignRoleMenu')
                Route.delete('/:id/remove-role-menu', 'MenusController.removeRoleMenu')
            }).prefix('/menus')

            Route.group(() => {
                Route.post('/', 'CategoriesController.create')
                Route.get('/', 'CategoriesController.findAll')
                Route.get('/:slug', 'CategoriesController.findOne')
                Route.patch('/:id', 'CategoriesController.update')
                Route.delete('/:id', 'CategoriesController.remove')
            }).prefix('/category')

            // Product
            Route.group(()=> {
                Route.get("/", "ProductsController.getProduct")
                Route.post("/", "ProductsController.create")
                Route.get("/:id", "ProductsController.findOne")
                Route.get("/:slug/detail", "ProductsController.findBySlug")
                Route.patch("/:id", "ProductsController.update")
                Route.delete("/:id", "ProductsController.remove")

                Route.get("/search", "ProductsController.search")
                // varian
            }).prefix("/product")

        }).middleware('auth:jwt')

        Route.get('/uploads/*', async ({ request, response }) => {
            const location = request.param('*').join('/')

            const exists = await Drive.exists(location)

            if(!exists){
                return response.notFound({
                    message: "file not found"
                })
            }
            const { size } = await Drive.getStats(location)

            response.type(extname(location))
            response.header('content-length', size)

            return response.stream(await Drive.getStream(location))
        })
    }).prefix('/v1')
}).prefix('/api')

