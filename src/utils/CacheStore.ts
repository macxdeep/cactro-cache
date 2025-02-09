import fs from 'fs';
import path from 'path';

class CacheStore {
  private cache: Map<string, string>;
  private filePath: string;

  constructor(fileName = 'store.json') {
    this.filePath = path.join(__dirname, fileName);
    this.cache = new Map<string, string>();

    this.loadCache(); // Load cache from file on startup
  }

  private loadCache() {
    if (fs.existsSync(this.filePath)) {
      try {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        this.cache = new Map(Object.entries(JSON.parse(data)));
      } catch (error) {
        console.error('Error loading cache:', error);
      }
    }
  }

  private saveCache(): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(Object.fromEntries(this.cache), null, 2),
        'utf-8'
      );
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  }

  public set(key: string, value: string): void {
    this.cache.set(key, value);
    this.saveCache();
  }

  public get(key: string): string | null {
    return this.cache.get(key) || null;
  }

  public delete(key: string): boolean {
    const exists = this.cache.delete(key);
    if (exists) {
      this.saveCache();
    }

    return exists;
  }

  public clear(): void {
    this.cache.clear();
    this.saveCache();
  }
}

export default new CacheStore();
