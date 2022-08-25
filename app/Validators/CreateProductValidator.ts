import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";

export default class CreateProductValidator {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
        code: schema.string({ trim: true, escape: true }, [rules.minLength(3)]),
        title: schema.string({ trim: true, escape: true }, [
            rules.minLength(3),
        ]),
        image: schema.file({
            extnames: ["png", "jpg", "jpeg", "gif", "bmp"],
            size: Env.get("IMG_SIZE"),
        }),
        brand: schema.string({ trim: true, escape: true }, [
            rules.minLength(3),
        ]),
        description: schema.string.optional({ trim: true, escape: true }, []),
        status: schema.string({ trim: true, escape: true }, []),
    });

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {
        required: this.ctx.i18n.formatMessage("validation.form.required", {
            field: "{{ field }}",
        }),
        minLength: this.ctx.i18n.formatMessage("validation.form.minLength", {
            field: "{{ field }}",
            minLength: "{{options.minLength}}",
        }),
        "file.size": this.ctx.i18n.formatMessage("validation.form.fileSize", {
            size: "{{ options.size }}",
        }),
        "file.extname": this.ctx.i18n.formatMessage(
            "validation.form.fileExtname",
            {
                extnames: "{{ options.extnames }}",
            }
        ),
    };
}
