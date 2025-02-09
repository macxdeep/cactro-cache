"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_controller_1 = require("../controllers/cache.controller");
const cacheRouter = (0, express_1.Router)();
cacheRouter.post('/', cache_controller_1.addCache);
cacheRouter.get('/:key', cache_controller_1.getCache);
cacheRouter.delete('/:key', cache_controller_1.deleteCache);
exports.default = cacheRouter;
