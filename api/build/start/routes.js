"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return "Hello world";
});
Route_1.default.post('/login', 'AuthController.login');
Route_1.default.post('/register', 'AuthController.register');
Route_1.default.group(() => {
    Route_1.default.get('/me', 'AuthController.me');
    Route_1.default.get('/recipes', 'RecipesController.index');
    Route_1.default.post('/recipes', 'RecipesController.store');
    Route_1.default.get('/recipes/:id', 'RecipesController.read');
    Route_1.default.put('/recipes/:id', 'RecipesController.update');
    Route_1.default.delete('/recipes/:id', 'RecipesController.delete');
    Route_1.default.get('/ingredients', 'IngredientsController.index');
    Route_1.default.post('/ingredients', 'IngredientsController.store');
    Route_1.default.get('/ingredients/:id', 'IngredientsController.read');
    Route_1.default.put('/ingredients/:id', 'IngredientsController.update');
    Route_1.default.delete('/ingredients/:id', 'IngredientsController.delete');
}).middleware('auth');
//# sourceMappingURL=routes.js.map