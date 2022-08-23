import Menu from "App/Models/Menu"
import Permission from "App/Models/Permission"
import Role from "App/Models/Role"
import UserGroup from "App/Models/UserGroup"
import UserPermission from "App/Models/UserPermission"
import Users from "App/Models/Users"
import Database from '@ioc:Adonis/Lucid/Database';

class UserService{

    public async profile(id){
        return await Users.findOrFail(id)
    }

    public async update(id, data){
        const user = await Users.findOrFail(id)
        user.name = data.name
        user.password = data.password
        return await user.save()
    }

    public async assignUserPermission(userId, permissionId, menuId){

        await Database.transaction(async(trx) => {
            const user = await Users.findOrFail(userId)
            const permission = await Permission.findOrFail(permissionId)
            const menu = await Menu.findOrFail(menuId)

            const userPermission = new UserPermission()
            userPermission.accessName = `${menu.title}.${permission.name}`

            userPermission.useTransaction(trx)
            await userPermission.save()

            await userPermission.related('user').associate(user)
            await userPermission.related('permission').associate(permission)
            await userPermission.related('menu').associate(menu)

        }).catch((err) => {
            throw new Error(err)
        })


    }

    public async assignUserGroup(id, data){
        const group = await UserGroup.findOrFail(data.group)
        const user = await Users.findOrFail(id)

        return await user.related('group').associate(group)
    }

    public async assignUserRole(id, roleId){
        const role = await Role.findOrFail(roleId)
        const user = await Users.findOrFail(id)

        return await user.related('role').associate(role)
    }

    public async getUserGroup(){
        const group = await UserGroup.all()

        return group
    }
}

export default new UserService
