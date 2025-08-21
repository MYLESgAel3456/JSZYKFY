// 代码生成时间: 2025-08-22 01:11:43
const d3 = require('d3');

// Define the cache size
const CACHE_CAPACITY = 100;

class Cache {
  /**
   * Create a new cache instance
   *
   * @param {number} capacity - The maximum number of items the cache can hold
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = d3.map();
    this.order = [];
  }

  /**
   * Get an item from the cache
   *
   * @param {string} key - The key of the item to retrieve
   * @returns {any} The cached item or null if not found
   */
  get(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      this.order.splice(this.order.indexOf(key), 1);
      this.order.push(key); // Move to the end to mark as recently used
      return item.value;
    } else {
      return null;
    }
  }

  /**
   * Add or update an item in the cache
   *
   * @param {string} key - The key of the item to store
   * @param {any} value - The value of the item to store
   */
  set(key, value) {
    if (this.cache.has(key)) {
      this.order.splice(this.order.indexOf(key), 1); // Remove the old entry
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.order.shift();
      this.cache.remove(oldestKey); // Evict the oldest item
    }
    this.cache.set(key, { value });
    this.order.push(key); // Add the new entry to the end
  }

  /**
   * Clear the cache
   */
  clear() {
    this.cache.clear();
    this.order = [];
  }
}

// Export the Cache class
module.exports = Cache;