// 代码生成时间: 2025-09-04 09:36:18
// Import the required modules
const d3 = require('d3-fetch');

/**
 * Makes an HTTP GET request to the specified URL
 *
 * @param {string} url - The URL to which the GET request is sent
 * @returns {Promise} - A promise that resolves with the response data
 */
function get(url) {
  return new Promise((resolve, reject) => {
    d3.request(url)
      .get((error, response) => {
        if (error) {
          // Handle any errors that occurred during the request
          reject(new Error(`Error fetching data: ${error}`));
        } else if (response.status >= 200 && response.status < 300) {
          // Resolve the promise with the response data
          resolve(response.text());
        } else {
          // Handle non-2xx status codes
          reject(new Error(`Server responded with status: ${response.status}`));
        }
      });
  });
}

/**
 * Makes an HTTP POST request to the specified URL with the provided data
 *
 * @param {string} url - The URL to which the POST request is sent
 * @param {Object} data - The data to be sent with the POST request
 * @returns {Promise} - A promise that resolves with the response data
 */
function post(url, data) {
  return new Promise((resolve, reject) => {
    d3.request(url)
      .post(data, (error, response) => {
        if (error) {
          // Handle any errors that occurred during the request
          reject(new Error(`Error sending data: ${error}`));
        } else if (response.status >= 200 && response.status < 300) {
          // Resolve the promise with the response data
          resolve(response.text());
        } else {
          // Handle non-2xx status codes
          reject(new Error(`Server responded with status: ${response.status}`));
        }
      });
  });
}

// Export the functions for use by other modules
module.exports = {
  get,
  post
};