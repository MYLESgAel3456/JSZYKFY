// 代码生成时间: 2025-09-16 10:48:20
(function() {
    // Ensure D3.js is loaded
    if (typeof d3 === 'undefined') {
        throw new Error('D3.js library is not loaded.');
    }

    /**
     * Generate a random number between min and max.
     * @param {number} min - Minimum value of the range.
     * @param {number} max - Maximum value of the range.
     * @returns {number} A random number between min and max.
     */
    function generateRandomNumber(min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') {
            throw new TypeError('Both min and max must be numbers.');
        }
        
        if (min > max) {
            throw new RangeError('Minimum value must be less than or equal to the maximum value.');
        }
        
        return Math.floor(d3.randomUniform(min, max + 1)());
    }

    // Expose the function to the global scope
    window.generateRandomNumber = generateRandomNumber;

    // Example usage: Generate a random number between 1 and 100 and log it to the console
    // window.generateRandomNumber(1, 100);

})();