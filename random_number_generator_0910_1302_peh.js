// 代码生成时间: 2025-09-10 13:02:08
// Importing D3 library
const d3 = require('d3');

class RandomNumberGenerator {
    // Constructor to set the minimum and maximum range
    constructor(min, max) {
        if (min > max) {
            throw new Error('Minimum value cannot be greater than maximum value.');
        }
        this.min = min;
        this.max = max;
    }

    // Method to generate a random number within the set range
    generate() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    // Method to update the minimum and maximum range
    updateRange(min, max) {
        if (min > max) {
            throw new Error('Minimum value cannot be greater than maximum value.');
        }
        this.min = min;
        this.max = max;
    }
}

// Example usage
try {
    const rng = new RandomNumberGenerator(1, 10);
    console.log('Random number:', rng.generate());
    rng.updateRange(5, 15);
    console.log('Random number after updating range:', rng.generate());
} catch (error) {
    console.error('Error:', error.message);
}
