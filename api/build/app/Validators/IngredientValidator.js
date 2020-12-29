"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class IngredientValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            title: Validator_1.schema.string({}, [
                Validator_1.rules.unique({
                    table: 'ingredients',
                    column: 'title',
                    whereNot: this.ctx.params.id ? { id: this.ctx.params.id } : undefined
                })
            ]),
            unit: Validator_1.schema.string.optional({}, [])
        });
        this.messages = {};
    }
}
exports.default = IngredientValidator;
//# sourceMappingURL=IngredientValidator.js.map