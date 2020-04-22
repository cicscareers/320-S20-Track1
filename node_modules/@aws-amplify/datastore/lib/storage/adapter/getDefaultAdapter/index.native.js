"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var asyncstorage_1 = __importDefault(require("../asyncstorage"));
var getDefaultAdapter = function () {
    return asyncstorage_1.default;
};
exports.default = getDefaultAdapter;
//# sourceMappingURL=index.native.js.map