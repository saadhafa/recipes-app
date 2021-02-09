"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingredient_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Ingredient"));
const IngredientValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/IngredientValidator"));
class IngredientsController {
    async index() {
        return Ingredient_1.default.all();
    }
    async read({ params }) {
        return Ingredient_1.default.findOrFail(params.id);
    }
    async store({ request }) {
        const data = await request.validate(IngredientValidator_1.default);
        return await Ingredient_1.default.create(data);
    }
    async update({ request, params }) {
        const data = await request.validate(IngredientValidator_1.default);
        const ingredient = await Ingredient_1.default.findOrFail(params.id);
        ingredient.merge(data);
        await ingredient.save();
        return ingredient;
    }
    async delete({ params }) {
        const ingredient = await Ingredient_1.default.findOrFail(params.id);
        await ingredient.related('recipes').detach();
        await ingredient.delete();
        return null;
    }
}
exports.default = IngredientsController;
//# sourceMappingURL=IngredientsController.js.map