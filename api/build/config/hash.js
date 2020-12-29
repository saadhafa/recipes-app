"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashConfig = {
    default: 'bcrypt',
    list: {
        argon: {
            driver: 'argon2',
            variant: 'id',
            iterations: 3,
            memory: 4096,
            parallelism: 1,
            saltSize: 16,
        },
        bcrypt: {
            driver: 'bcrypt',
            rounds: 10,
        },
    },
};
exports.default = hashConfig;
//# sourceMappingURL=hash.js.map