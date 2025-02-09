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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCache = exports.getCache = exports.addCache = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const CacheStore_1 = __importDefault(require("../utils/CacheStore"));
const addCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { key, value } = req.body;
        if (!key || !value) {
            throw new Error('Key and value are required!');
        }
        CacheStore_1.default.set(key, value);
        return res.status(201).json((0, apiResponse_1.successResponse)({ key, value }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.failureResponse)(error));
    }
});
exports.addCache = addCache;
const getCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        if (!key) {
            throw new Error('Key is missing!');
        }
        const value = CacheStore_1.default.get(key);
        if (!value) {
            return res
                .status(404)
                .json((0, apiResponse_1.failureResponse)(new Error('Key not found in store.')));
        }
        else {
            return res.status(201).json((0, apiResponse_1.successResponse)(value));
        }
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.failureResponse)(error));
    }
});
exports.getCache = getCache;
const deleteCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        if (!key) {
            return res
                .status(400)
                .json((0, apiResponse_1.failureResponse)(new Error('Key and value are required!')));
        }
        const deleted = CacheStore_1.default.delete(key);
        if (!deleted) {
            return res.status(404).json((0, apiResponse_1.failureResponse)(new Error('Key not found')));
        }
        else {
            return res.status(200).json((0, apiResponse_1.successResponse)('Deleted successfully!'));
        }
    }
    catch (error) {
        return (0, apiResponse_1.failureResponse)(error);
    }
});
exports.deleteCache = deleteCache;
