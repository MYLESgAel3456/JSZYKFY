// 代码生成时间: 2025-09-23 21:12:27
// Importing required modules
const d3 = require('d3-fetch');

/**
 * Validates a URL
 * @param {string} url - The URL to be validated
 * @returns {boolean} - True if URL is valid, false otherwise
 */
function isValidUrl(url) {
    try {
        // Using D3's fetch to check if the URL is valid
        d3.request(url).responseType('blob').catch(error => {
            return false; // If there's an error, return false
        });

        // If no error, return true
        return true;
    } catch (error) {
        console.error('Error validating URL:', error);
        return false; // If there's an error in the function itself, return false
    }
}

// Example usage:
const testUrl = 'https://www.example.com';
const isValid = isValidUrl(testUrl);

console.log(`Is ${testUrl} valid? ${isValid}`);

// Export the function for use in other modules
module.exports = isValidUrl;