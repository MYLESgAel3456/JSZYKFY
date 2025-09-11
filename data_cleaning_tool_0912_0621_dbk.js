// 代码生成时间: 2025-09-12 06:21:30
// Importing the D3 library
const d3 = require('d3');

/**
 * Cleans the data by removing missing values.
 *
 * @param {Array} data - The array of data to clean.
 * @returns {Array} The cleaned data.
 */
function cleanMissingValues(data) {
  return data.filter(item => item !== null && item !== undefined && item !== '');
}

/**
 * Normalizes numerical data by subtracting the mean and dividing by the standard deviation.
 *
 * @param {Array} data - The array of numerical data to normalize.
 * @returns {Array} The normalized data.
 */
function normalizeData(data) {
  let mean = d3.mean(data);
  let deviation = d3.deviation(data);
  return data.map(value => (value - mean) / deviation);
}

/**
 * Converts data types of a dataset.
 *
 * @param {Array} data - The array of data to convert.
 * @param {Object} typeMap - An object mapping column names to desired data types.
 * @returns {Array} The converted data.
 */
function convertDataTypes(data, typeMap) {
  return data.map(row => {
    let newRow = {};
    Object.keys(row).forEach(key => {
      let type = typeMap[key] || typeof row[key];
      newRow[key] = type === 'number' ? parseFloat(row[key]) : row[key];
    });
    return newRow;
  });
}

/**
 * Main function to process the data.
 *
 * @param {Array} originalData - The original dataset to be processed.
 * @param {Object} options - Options for data cleaning and preprocessing.
 * @returns {Array} The processed data.
 */
function processData(originalData, options) {
  try {
    // Clean missing values
    let cleanedData = cleanMissingValues(originalData);

    // Normalize data if required
    if (options.normalize) {
      cleanedData = cleanedData.map(row => {
        let newRow = {...row};
        Object.keys(row).forEach(key => {
          if (typeof row[key] === 'number') {
            newRow[key] = normalizeData([ newRow[key] ]);
          }
        });
        return newRow;
      });
    }

    // Convert data types if required
    if (options.typeMap) {
      cleanedData = convertDataTypes(cleanedData, options.typeMap);
    }

    return cleanedData;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}

// Example usage
const originalData = [
  { age: '25', height: null },
  { age: '30', height: 170 },
  { age: 'undefined', height: 165 },
];

const options = {
  normalize: true,
  typeMap: {
    age: 'number',
    height: 'number'
  }
};

const processedData = processData(originalData, options);
console.log(processedData);
