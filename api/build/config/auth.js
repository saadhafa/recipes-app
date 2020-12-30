"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const authConfig = {
    guard: 'web',
    list: {
        web: {
            driver: 'session',
            provider: {
                driver: 'lucid',
                identifierKey: 'id',
                uids: ['email'],
                model: User_1.default,
            },
        },
    },
};
exports.default = authConfig;
//# sourceMappingURL=auth.js.map