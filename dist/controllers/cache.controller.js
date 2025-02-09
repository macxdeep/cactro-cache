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
        const { key, value } = req.body;
        if (!key || !value) {
            res
                .status(400)
                .json((0, apiResponse_1.failureResponse)(new Error('key and value are required!')));
            return;
        }
        CacheStore_1.default.set(key.toString(), value); // stringify the key
        res.status(201).json((0, apiResponse_1.successResponse)({ key, value }));
    }
    catch (error) {
        res.status(500).json((0, apiResponse_1.failureResponse)(error));
    }
});
exports.addCache = addCache;
const getCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        if (!key) {
            res.status(400).json((0, apiResponse_1.failureResponse)(new Error('key is missing!')));
            return;
        }
        const value = CacheStore_1.default.get(key);
        if (!value) {
            res
                .status(404)
                .json((0, apiResponse_1.failureResponse)(new Error('Key not found in store.')));
            return;
        }
        res.status(201).json((0, apiResponse_1.successResponse)(value));
    }
    catch (error) {
        res.status(500).json((0, apiResponse_1.failureResponse)(error));
    }
});
exports.getCache = getCache;
const deleteCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        if (!key) {
            res.status(400).json((0, apiResponse_1.failureResponse)(new Error('key is required!')));
            return;
        }
        const deleted = CacheStore_1.default.delete(key);
        if (!deleted) {
            res.status(404).json((0, apiResponse_1.failureResponse)(new Error('Key not found')));
        }
        res.status(200).json((0, apiResponse_1.successResponse)(deleted));
    }
    catch (error) {
        res.status(500).json((0, apiResponse_1.failureResponse)(error));
    }
});
exports.deleteCache = deleteCache;
