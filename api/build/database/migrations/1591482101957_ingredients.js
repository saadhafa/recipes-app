"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Ingredients extends Schema_1.default {
    async up() {
        this.schema.createTable('ingredients', (table) => {
            table.increments('id');
            table.string('title').notNullable().unique();
            table.string('unit').nullable();
        });
        this.schema.createTable('recipes', (table) => {
            table.increments('id');
            table.string('title').notNullable().unique(),
                table.text('content');
            table.timestamps(true);
        });
        this.schema.createTable('ingredient_recipe', table => {
            table.integer('recipe_id').unsigned();
            table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE');
            table.integer('ingredient_id').unsigned();
            table.foreign('ingredient_id').references('ingredients.id').onDelete('CASCADE');
            table.float('quantity');
        });
    }
    async down() {
        this.schema.dropTable('ingredients');
        this.schema.dropTable('recipes');
        this.schema.dropTable('ingredient_recipe');
    }
}
exports.default = Ingredients;
//# sourceMappingURL=1591482101957_ingredients.js.map