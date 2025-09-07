// 代码生成时间: 2025-09-07 12:35:59
// Define the MathToolbox namespace
const MathToolbox = (function() {

  // Private variables
  let operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 'Error: Division by zero'
  };

  // Public API
  return {

    /**
     * Add two numbers
     *
     * @param {number} num1 - The first number
     * @param {number} num2 - The second number
     * @returns {number|string} - The result of the addition or an error message
     */
    add: function(num1, num2) {
      return operations.add(num1, num2);
    },

    /**
     * Subtract two numbers
     *
     * @param {number} num1 - The first number
     * @param {number} num2 - The second number
     * @returns {number} - The result of the subtraction
     */
    subtract: function(num1, num2) {
      return operations.subtract(num1, num2);
    },

    /**
     * Multiply two numbers
     *
     * @param {number} num1 - The first number
     * @param {number} num2 - The second number
     * @returns {number} - The result of the multiplication
     */
    multiply: function(num1, num2) {
      return operations.multiply(num1, num2);
    },

    /**
     * Divide two numbers
     *
     * @param {number} num1 - The first number (dividend)
     * @param {number} num2 - The second number (divisor)
     * @returns {number|string} - The result of the division or an error message
     */
    divide: function(num1, num2) {
      return operations.divide(num1, num2);
    }

  };

})();

// Example usage:
// console.log(MathToolbox.add(5, 3)); // Outputs: 8
// console.log(MathToolbox.divide(10, 0)); // Outputs: 'Error: Division by zero'
