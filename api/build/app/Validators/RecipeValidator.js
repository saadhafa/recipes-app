"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class RecipeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            title: Validator_1.schema.string({}, [
                Validator_1.rules.unique({
                    table: 'recipes',
                    column: 'title',
                    whereNot: this.ctx.params.id ? { id: this.ctx.params.id } : undefined
                })
            ]),
            content: Validator_1.schema.string(),
            short: Validator_1.schema.string(),
            ingredients: Validator_1.schema.array().members(Validator_1.schema.object().members({
                id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'ingredients', column: 'id' })]),
                quantity: Validator_1.schema.number(),
            }))
        });
        this.messages = {};
    }
}
exports.default = RecipeValidator;
//# sourceMappingURL=RecipeValidator.js.map