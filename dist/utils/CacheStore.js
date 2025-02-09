"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CacheStore {
    constructor(fileName = 'store.json') {
        this.filePath = path_1.default.join(__dirname, fileName);
        this.cache = new Map();
        this.loadCache(); // Load cache from file on startup
    }
    loadCache() {
        if (fs_1.default.existsSync(this.filePath)) {
            try {
                const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
                this.cache = new Map(Object.entries(JSON.parse(data)));
            }
            catch (error) {
                console.error('Error loading cache:', error);
            }
        }
    }
    saveCache() {
        try {
            fs_1.default.writeFileSync(this.filePath, JSON.stringify(Object.fromEntries(this.cache), null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Error saving cache:', error);
        }
    }
    set(key, value) {
        this.cache.set(key, value);
        this.saveCache();
    }
    get(key) {
        return this.cache.get(key) || null;
    }
    delete(key) {
        const exists = this.cache.delete(key);
        if (exists) {
            this.saveCache();
        }
        return exists;
    }
    clear() {
        this.cache.clear();
        this.saveCache();
    }
}
exports.default = new CacheStore();
