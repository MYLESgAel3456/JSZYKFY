// 代码生成时间: 2025-09-19 23:42:25
// data_generator.js
// This module generates test data using JS and D3 library.

// Importing the D3 library
const d3 = require('d3');

/**
 * Generates a random integer between min and max values.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer between min and max.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random date between two dates.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Date} A random date between startDate and endDate.
 */
function randomDate(startDate, endDate) {
  const dateRange = endDate - startDate;
  const randomMs = Math.random() * dateRange;
  return new Date(startDate.getTime() + randomMs);
}

/**
 * Generates a random string of a specified length.
 * @param {number} length - The length of the string.
 * @returns {string} A random string of the specified length.
 */
function randomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generates test data with a specified number of entries.
 * @param {number} numEntries - The number of entries to generate.
 * @param {object} options - Options for the data generation.
 * @returns {Array} An array of test data entries.
 */
function generateTestData(numEntries, options) {
  // Validate the options
  if (!options) {
    throw new Error('Options must be provided for data generation.');
  }
  
  // Define the start and end dates for the date range.
  const startDate = new Date('2020-01-01');
  const endDate = new Date('2023-01-01');
  
  // Initialize the array to hold the test data.
  const testData = [];
  
  for (let i = 0; i < numEntries; i++) {
    testData.push({
      id: i + 1,
      name: randomString(randomInteger(5, 15)), // Random name length between 5 and 15 characters.
      age: randomInteger(18, 70), // Random age between 18 and 70.
      income: d3.randomUniform(30000, 50000)(), // Random income between $30,000 and $50,000.
      date: randomDate(startDate, endDate) // Random date within the specified range.
    });
  }
  
  return testData;
}

// Example usage of the generateTestData function
try {
  const testData = generateTestData(10, {}); // Generate 10 entries of test data.
  console.log(testData);
} catch (error) {
  console.error(error.message);
}