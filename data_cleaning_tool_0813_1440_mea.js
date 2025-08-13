// 代码生成时间: 2025-08-13 14:40:27
// Import D3.js library
const d3 = require('d3');

/**
 * Removes null or undefined values from the data array
 * @param {Array} data - The input data array
 * @returns {Array} - The cleaned data array
 */
function cleanNullValues(data) {
    return data.filter(item => item !== null && item !== undefined);
}

/**
 * Filters data based on a given condition
 * @param {Array} data - The input data array
 * @param {Function} condition - The condition function to filter data
 * @returns {Array} - The filtered data array
 */
function filterData(data, condition) {
    return data.filter(condition);
}

/**
 * Sorts the data array based on a given key and order
 * @param {Array} data - The input data array
 * @param {string} key - The key to sort by
 * @param {string} order - 'asc' for ascending or 'desc' for descending
 * @returns {Array} - The sorted data array
 */
function sortData(data, key, order = 'asc') {
    return data.sort((a, b) => {
        if (order === 'asc') {
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });
}

/**
 * The main function that executes the data cleaning and preprocessing
 * @param {Array} rawData - The raw data array to be cleaned and preprocessed
 */
function processData(rawData) {
    try {
        // Clean null values
        const cleanedData = cleanNullValues(rawData);

        // Filter data based on a condition (e.g., age > 20)
        const filteredData = filterData(cleanedData, d => d.age > 20);

        // Sort data by age in descending order
        const sortedData = sortData(filteredData, 'age', 'desc');

        // Return the final processed data
        return sortedData;
    } catch (error) {
        // Handle any errors that occur during data processing
        console.error('Error processing data:', error);
        throw error;
    }
}

// Example usage:
const rawData = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: null },
    { name: 'Doe', age: 30 },
    { name: 'Doe', age: undefined }
];

const processedData = processData(rawData);
console.log(processedData);