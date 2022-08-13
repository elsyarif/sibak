import Users from "App/Models/Users";
import RegisterInterface from "App/interface/auth/register.interface";
import Logger from '@ioc:Adonis/Core/Logger';
import Hash from "@ioc:Adonis/Core/Hash";

class AuthService {
    public async validate(identity: string, passwords: string) {
        const user = await Users.query().where('username', identity).orWhere('email', identity).first()

        if(!user){
            throw new Error('Not Found')
        }

        const match = await Hash.verify(user.password, passwords)
        if(!match){
            throw new Error('password salah')
        }

        return user;
    }

    public async register(registerDto: RegisterInterface) {
        const user = new Users();
        user.name = registerDto.name;
        user.username = registerDto.username;
        user.email = registerDto.email;
        user.password = registerDto.password;
        user.isActive = registerDto.isActive || false;

        return await user.save();
    }

}

export default new AuthService();
