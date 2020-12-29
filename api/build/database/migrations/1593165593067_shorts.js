"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Shorts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'recipes';
    }
    async up() {
        this.schema.alterTable(this.tableName, table => {
            table.text('short');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, table => {
            table.dropColumn('short');
        });
    }
}
exports.default = Shorts;
//# sourceMappingURL=1593165593067_shorts.js.map