"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Recipe"));
const RecipeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/RecipeValidator"));
class RecipesController {
    async index() {
        return await Recipe_1.default.query().select(['id', 'title', 'short']);
    }
    async read({ params }) {
        const recipe = await Recipe_1.default.findOrFail(params.id);
        await recipe.preload('ingredients', (query) => {
            query.pivotColumns(['quantity']);
        });
        return recipe;
    }
    async store({ request }) {
        const data = await request.validate(RecipeValidator_1.default);
        const recipe = await Recipe_1.default.create(data);
        await recipe.related('ingredients').attach(data.ingredients.reduce((acc, ingredient) => {
            acc[ingredient.id] = {
                quantity: ingredient.quantity
            };
            return acc;
        }, {}));
        return recipe;
    }
    async update({ request, params }) {
        const data = await request.validate(RecipeValidator_1.default);
        const recipe = await Recipe_1.default.findOrFail(params.id);
        recipe.merge(data);
        await recipe.save();
        await recipe.related('ingredients').sync(data.ingredients.reduce((acc, ingredient) => {
            acc[ingredient.id] = {
                quantity: ingredient.quantity
            };
            return acc;
        }, {}));
        await recipe.preload('ingredients', (query) => {
            query.pivotColumns(['quantity']);
        });
        return recipe;
    }
    async delete({ params }) {
        const recipe = await Recipe_1.default.findOrFail(params.id);
        await recipe.related('ingredients').detach();
        await recipe.delete();
        return null;
    }
}
exports.default = RecipesController;
//# sourceMappingURL=RecipesController.js.map