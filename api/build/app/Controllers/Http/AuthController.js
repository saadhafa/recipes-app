"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    async login({ auth, request }) {
        const { email, password } = request.only(['email', 'password']);
        await auth.attempt(email, password);
        return auth.user;
    }
    async register() {
        const user = await User_1.default.create({
            email: 'user',
            password: 'secret'
        });
        return user;
    }
    async me({ auth }) {
        return auth.user;
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map