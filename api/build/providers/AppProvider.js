"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
class AppProvider {
    constructor($container) {
        this.$container = $container;
    }
    register() {
    }
    boot() {
    }
    shutdown() {
    }
    async ready() {
        const Database = (await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database")))).default;
        const Event = (await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("Adonis/Core/Event")))).default;
        Event.on('db:query', Database.prettyPrint);
    }
}
exports.default = AppProvider;
//# sourceMappingURL=AppProvider.js.map