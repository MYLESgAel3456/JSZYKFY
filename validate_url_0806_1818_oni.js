// 代码生成时间: 2025-08-06 18:18:54
 * This script defines a function 'validateURL' that takes a URL string as input and checks if it is valid.
 * It uses D3's request utility to send an HTTP HEAD request to the URL and checks the response status.
 *
 * Usage:
 * validateURL('http://example.com', function(error, isValid) {
 *     if (error) {
 *         console.error('Error:', error);
 *     } else if (isValid) {
 *         console.log('URL is valid');
 *     } else {
 *         console.log('URL is invalid');
 *     }
 * });
 */

// Import D3.js library
const d3 = require('d3');

/**
 * Validates a given URL by checking its response status.
 *
 * @param {string} url - The URL to be validated.
 * @param {function} callback - A callback function to handle the validation result.
 * @param {Error} callback.error - An error object if the validation fails.
 * @param {boolean} callback.isValid - Whether the URL is valid or not.
 */
function validateURL(url, callback) {
    // Check if URL is not provided or is empty
    if (!url || url.trim() === '') {
        return callback(new Error('URL is required'), false);
    }

    // Define the request options
    const request = d3.request(url);
    request
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Accept', 'text/html, */*');

    // Send a HEAD request to the URL
    request.head((error, response) => {
        // Handle request error
        if (error) {
            return callback(error, false);
        }
        
        // Check if the URL is valid based on the response status code
        const isValid = response.status && response.status >= 200 && response.status < 400;
        callback(null, isValid);
    });
}

// Example usage
validateURL('http://example.com', (error, isValid) => {
    if (error) {
        console.error('Error:', error);
    } else if (isValid) {
        console.log('URL is valid');
    } else {
        console.log('URL is invalid');
    }
});
