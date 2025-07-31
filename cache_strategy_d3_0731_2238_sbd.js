// 代码生成时间: 2025-07-31 22:38:30
class Cache {
  /**
   * Creates a new instance of Cache.
   *
   * @param {Object} options - Options for the cache, including its size and expiration time.
   */
  constructor(options) {
    this.storage = new Map();
    this.sizeLimit = options.size || 100;
    this.ttl = options.ttl || 60000; // Default TTL is 60 seconds
  }

  /**
   * Sets an item in the cache with a given key and value.
   *
   * @param {string} key - The key under which to store the value.
   * @param {any} value - The value to be stored.
   * @param {number} [ttl] - Optional time to live for the cache item.
   */
  set(key, value, ttl = this.ttl) {
    if (this.storage.size >= this.sizeLimit) {
      this.evict();
    }
    const now = Date.now();
    this.storage.set(key, { value, expires: now + ttl });
  }

  /**
   * Retrieves an item from the cache by its key.
   *
   * @param {string} key - The key of the item to retrieve.
   * @returns {any} The cached value or null if it's expired or not found.
   */
  get(key) {
    const cached = this.storage.get(key);
    if (!cached) return null;

    const { value, expires } = cached;
    if (expires < Date.now()) {
      this.storage.delete(key);
      return null;
    }

    return value;
  }

  /**
   * Evicts the oldest item from the cache if it has reached its TTL.
   */
  evict() {
    let oldest = null;
    for (const [key, { expires }] of this.storage) {
      if (!oldest || expires < this.storage.get(oldest).expires) {
        oldest = key;
      }
    }
    if (oldest) this.storage.delete(oldest);
  }
}

/**
 * Example usage of the Cache class.
 */
const cache = new Cache({
  size: 10,
  ttl: 30000 // 30 seconds TTL
});

// Set an item in the cache
cache.set('dataKey', { data: 'Some data' });

// Get an item from the cache
const data = cache.get('dataKey');
if (data) {
  console.log('Retrieved data:', data);
} else {
  console.log('Data not found or expired');
}
