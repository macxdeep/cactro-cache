# Cactro Cache

## 📌 Project Overview

This project is a simple caching API built using Node.js and Express.js, designed to store, retrieve, and delete key-value pairs efficiently. To ensure data persistence, a CacheStore class is implemented, which saves and loads cache data from a JSON file (store.json).

The cache is loaded into memory when the server starts, allowing for fast access while maintaining persistency across restarts.

### 🔹 Features

- ✅ Store Key-Value Pairs → Save data in memory and persist it to a JSON file.
- ✅ Retrieve Cached Data → Fetch stored values using their keys.
- ✅ Delete Cached Entries → Remove specific keys from the cache.
- ✅ Persistent Storage → Saves cache data to store.json, ensuring data isn't lost when the server restarts.

### 🔹 How It Works?

- When the server starts, CacheStore loads existing data from store.json into memory.
- Any newly added cache entries are stored both in memory and persisted to store.json.
- The cache remains available in memory for fast lookups while ensuring long-term storage in the JSON file.

## Test the APIs using below curl

### Create Cache

```
curl --request POST \
  --url https://cactro-cache.vercel.app/cache/ \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.3.0' \
  --data '{
	"key": "30",
	"value": {
		"hello": "world!"
	}
}'
```

### Get Cache

```
curl --request GET \
  --url https://cactro-cache.vercel.app/cache/30 \
  --header 'User-Agent: insomnia/10.3.0'
```

### Delete Cache

```
curl --request DELETE \
  --url https://cactro-cache.vercel.app/cache/30 \
  --header 'User-Agent: insomnia/10.3.0'
```

## Improvements in [#this](https://github.com/macxdeep/cactro-cache/tree/improvements) branch

- refactor: type safety in requests
- feat: Added API KEY to access endpoint
- fix: stringfy the key while saving in store
