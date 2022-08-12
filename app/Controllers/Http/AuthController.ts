import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "App/services/AuthService";
import RegisterSchema from "App/Validators/RegisterUserValidator";

export default class AuthController {
    public async login({ request, response, auth, i18n }: HttpContextContract) {
        const { identity, password } = request.body();

        try {
            const user = await AuthService.validate(identity, password)
    
            const { rememberMeToken, createdAt, updatedAt, ...result} = user

            const jwt = await auth.use('jwt').generate(user, {
                payload: {
                    username: user.username,
                    email: user.email
                }
            })

            response.ok({
                message: i18n.formatMessage("auth.login"),
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    access_token: jwt.accessToken,
                }
            })
            
        } catch (error) {
            response.badRequest({
                message: 'failed',
                data: error.message
            })
        }
    }

    public async register({ request, response, i18n }: HttpContextContract) {
        try {
            const payload = await request.validate(RegisterSchema);

            const user = await AuthService.register({...payload, isActive: true})

            response.status(200).json({
                statusCode: 200,
                message: i18n.formatMessage('auth.register'),
                data: user,
            });

        } catch (error) {
            response.badRequest({
                message: "failed",
                error: error.messages.errors,
            });
        }
    }
}
