import UserGroup from "App/Models/UserGroup"
import Users from "App/Models/Users"

class UserService{

    public async profile(id){
        return await Users.findOrFail(id)
    }

    public async assignUserPermission(){}

    public async assignUserGroup(id, data){
        const user = await Users.findOrFail(id)
        user.group = data.group
        return await user.save()
    }

    public async getUserGroup(){
        const group = await UserGroup.all()

        return group
    }
}

export default new UserService
