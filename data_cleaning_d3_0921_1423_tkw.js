// 代码生成时间: 2025-09-21 14:23:05
// Data cleaning and preprocessing functions
const dataCleaningTools = {

  // Function to remove missing values from the dataset
  removeMissingValues: function(data) {
    "use strict";
    try {
      // Filter out data entries with missing values
      return data.filter(d => Object.values(d).every(v => v !== null && !isNaN(v)));
    } catch (error) {
      console.error("Error removing missing values: ", error);
      return [];
    }
  },

  // Function to normalize data within a specified range
  normalizeData: function(data, range) {
    "use strict";
    try {
      if (!range || range.length !== 2) {
        throw new Error("Normalization range must be an array of two numbers.");
      }
      // Calculate the min and max values of the dataset
      const [min, max] = d3.extent(data, d => d.value);
      // Map values to the new range
      return data.map(d => ({ ...d, value: d3.scaleLinear().domain([min, max]).range(range)(d.value) }));
    } catch (error) {
      console.error("Error normalizing data: ", error);
      return [];
    }
  },

  // Function to filter out outliers from the dataset
  filterOutliers: function(data, m = 2) {
    "use strict";
    try {
      const quartiles = d3.quantile(data.map(d => d.value)).quantiles([0.25, 0.5, 0.75]);
      const iqr = quartiles[2] - quartiles[0];
      const lowerBound = quartiles[0] - m * iqr;
      const upperBound = quartiles[2] + m * iqr;
      // Filter out data entries that are outliers
      return data.filter(d => d.value >= lowerBound && d.value <= upperBound);
    } catch (error) {
      console.error("Error filtering outliers: ", error);
      return [];
    }
  }

};

// Example usage of the data cleaning tools
const dataset = [
  { id: 1, value: 10 },
  { id: 2, value: null },
  { id: 3, value: 20 },
  { id: 4, value: 30 },
  { id: 5, value: 100 }, // Outlier
  { id: 6, value: NaN },
  { id: 7, value: 25 }
];

const cleanedData = dataCleaningTools.removeMissingValues(dataset);
const normalizedData = dataCleaningTools.normalizeData(cleanedData, [0, 100]);
const finalData = dataCleaningTools.filterOutliers(normalizedData);

console.log("Cleaned Data: ", cleanedData);
console.log("Normalized Data: ", normalizedData);
console.log("Final Data: ", finalData);
