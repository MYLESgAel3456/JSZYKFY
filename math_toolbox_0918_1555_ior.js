// 代码生成时间: 2025-09-18 15:55:00
const MathToolbox = (function() {

  /**
   * @param {number} number1 - First number for addition.
   * @param {number} number2 - Second number for addition.
   * @returns {number} - The sum of the two numbers.
   */
  function add(number1, number2) {
    if (!isFinite(number1) || !isFinite(number2)) {
      throw new Error('Input values must be finite numbers.');
    }
    return number1 + number2;
  }

  /**
   * @param {number} number1 - First number for subtraction.
   * @param {number} number2 - Second number for subtraction.
   * @returns {number} - The difference of the two numbers.
   */
  function subtract(number1, number2) {
    if (!isFinite(number1) || !isFinite(number2)) {
      throw new Error('Input values must be finite numbers.');
    }
    return number1 - number2;
  }

  /**
   * @param {number} number1 - First number for multiplication.
   * @param {number} number2 - Second number for multiplication.
   * @returns {number} - The product of the two numbers.
   */
  function multiply(number1, number2) {
    if (!isFinite(number1) || !isFinite(number2)) {
      throw new Error('Input values must be finite numbers.');
    }
    return number1 * number2;
  }

  /**
   * @param {number} number1 - First number for division.
   * @param {number} number2 - Second number for division.
   * @returns {number} - The quotient of the two numbers.
   */
  function divide(number1, number2) {
    if (!isFinite(number1) || !isFinite(number2)) {
      throw new Error('Input values must be finite numbers.');
    }
    if (number2 === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return number1 / number2;
  }

  // Public API
  return {
    add,
    subtract,
    multiply,
    divide
  };

})();

// Example usage:
try {
  console.log(MathToolbox.add(5, 3)); // Output: 8
  console.log(MathToolbox.subtract(10, 4)); // Output: 6
  console.log(MathToolbox.multiply(7, 2)); // Output: 14
  console.log(MathToolbox.divide(8, 4)); // Output: 2
} catch (error) {
  console.error(error.message);
}
