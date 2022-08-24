import Logger from "@ioc:Adonis/Core/Logger";
import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BadRequestException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BadRequestException extends Exception {
    
    public async handle(error: this, ctx: HttpContextContract) {
        Logger.warn("Bad Request");
        return ctx.response.badRequest({
            statusCode: error.status,
            message: error.message,
            error: this.stack
        })
    }
}
