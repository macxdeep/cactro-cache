"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const apiKeyMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const API_KEY = process.env.API_KEY_VALUE;
        if (!API_KEY) {
            throw new Error('API_KEY_VALUE is undefined!');
        }
        const apiKey = req.headers['x-api-key'];
        if (!apiKey || apiKey !== API_KEY) {
            return res
                .status(401)
                .json((0, apiResponse_1.failureResponse)(new Error('Invalid API KEY!')));
        }
        next();
    }
    catch (error) {
        console.error(`Error in apiKeyMiddleware: ${error}`);
        return res.status(500).json((0, apiResponse_1.failureResponse)(error));
    }
});
exports.apiKeyMiddleware = apiKeyMiddleware;
