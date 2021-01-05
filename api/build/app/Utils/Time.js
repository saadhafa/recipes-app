"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
function wait(duration) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, duration);
    });
}
exports.wait = wait;
//# sourceMappingURL=Time.js.map