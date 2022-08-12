import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterUserValidator {
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
        name: schema.string({ escape: true }, [
            rules.minLength(3),
            rules.maxLength(35),
        ]),
        username: schema.string({ trim: true }, [
            rules.minLength(3),
            rules.maxLength(35),
            rules.unique({ table: "users", column: "username" }),
            rules.notIn(["test", "admin", "dev"]),
            rules.regex(/^[a-zA-Z0-9-_]+$/),
        ]),
        email: schema.string({}, [
            rules.email(),
            rules.unique({ table: "users", column: "email" }),
        ]),
        password: schema.string({}, [rules.minLength(5), rules.alphaNum()]),
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
        minLength: this.ctx.i18n.formatMessage("validation.form.minLength", {
            field: "{{ field }}",
            minLength: "{{options.minLength}}",
        }),
        maxLength: this.ctx.i18n.formatMessage("validation.form.maxLength", {
            field: "{{ field }}",
            maxLength: "{{options.maxLength}}",
        }),
        unique: this.ctx.i18n.formatMessage("validation.form.unique", {
            field: "{{ field }}",
        }),
        notIn: this.ctx.i18n.formatMessage("validation.form.notIn", {
            field: "{{ field }}",
            value: this.ctx.request.body()?.username,
        }),
        email: this.ctx.i18n.formatMessage("validation.form.email", {
            field: "{{ field }}",
        }),
    };
}
