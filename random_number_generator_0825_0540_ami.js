// 代码生成时间: 2025-08-25 05:40:24
 * Example usage:
 *   const rng = new RandomNumberGenerator(1, 100);
 *   console.log(rng.generate());
 */

class RandomNumberGenerator {
  // Constructor takes the minimum and maximum values for the range
  constructor(min, max) {
    // Error handling for invalid arguments
    if (min > max) {
      throw new Error('Minimum value cannot be greater than maximum value.');
    }
    this.min = min;
    this.max = max;
  }

  // Generates a random number within the defined range
  generate() {
    // Error handling for out of bounds
    if (this.min > this.max) {
      throw new Error('The range is invalid. Minimum value must be less than maximum value.');
    }
    // Generate a random number and normalize it to the defined range
    return Math.round((this.max - this.min + 1) * Math.random() + this.min);
  }
}

// Example usage:
try {
  const rng = new RandomNumberGenerator(1, 100);
  console.log('Random number:', rng.generate());
} catch (error) {
  console.error(error.message);
}
