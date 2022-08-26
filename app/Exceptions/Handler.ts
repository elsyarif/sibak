/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from "@ioc:Adonis/Core/Logger";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ExceptionHandler extends HttpExceptionHandler {
    constructor() {
        super(Logger);
    }

    public async handle(error: any, ctx: HttpContextContract): Promise<any> {

        if (error.code === "E_UNAUTHORIZED_ACCESS") {
            return ctx.response.unauthorized({
                statusCode: error.status,
                message: error.message.split(":")[1].trim(),
            });
        }

        if (error.code === "E_ROW_NOT_FOUND") {
            return ctx.response.notFound({
                stausCode: error.status,
                message: error.message.split(":")[1].trim(),
                error: error.stack,
            });
        }

        if (error.code === "E_VALIDATION_FAILURE") {
            return ctx.response.unprocessableEntity({
				statusCode: error.status,
                message: "Error validation",
                errors: error.messages.errors,
            });
        }

        return super.handle(error, ctx);
    }
}
