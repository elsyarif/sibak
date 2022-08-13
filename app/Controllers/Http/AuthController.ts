import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "App/services/AuthService";
import RegisterSchema from "App/Validators/RegisterUserValidator";
import Logger from '@ioc:Adonis/Core/Logger';

export default class AuthController {

    public async login({ request, response, auth, i18n }: HttpContextContract) {
        const { uid, password } = request.body();

        try {
            // const user = await AuthService.validate(uid, password)
            const user = await auth.verifyCredentials(uid, password)

            const jwt = await auth.use('jwt').login(user)
            Logger.info('running')

            response.cookie('x-refresh-token', jwt.refreshToken, {
                httpOnly: true,
                maxAge: 86400 * 30, // 30 days
                secure: false
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
                message: i18n.formatMessage('auth.invalid_login'),
                error: error.message
            })
        }
    }

    public async register({ request, response, i18n }: HttpContextContract) {
        try {
            const payload = await request.validate(RegisterSchema);

            const user = await AuthService.register({...payload})

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

    public async refresh({ auth, request, response, i18n }: HttpContextContract){
        const refresh = request.cookie('x-refresh-token')

        const jwt = await auth.use('jwt').loginViaRefreshToken(refresh)

        response.cookie('x-refresh-token', jwt.refreshToken, {
            httpOnly: true,
            maxAge: 86400 * 30, // 30 days
            secure: false
        })

        response.ok({
            message: i18n.formatMessage('auth.refresh_token'),
            data: {
                access_token : jwt.accessToken
            }
        })
    }

    public async logout({ auth, response, i18n }: HttpContextContract){
        await auth.use('jwt').revoke()

        response.clearCookie('x-refresh-token')

        response.ok({
            message: i18n.formatMessage('auth.logout'),
        })
    }

    public async forgotPassword({}: HttpContextContract){}
}
