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

import Route from '@ioc:Adonis/Core/Route'

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

        }).middleware('auth:jwt')
    }).prefix('/v1')
}).prefix('/api')

