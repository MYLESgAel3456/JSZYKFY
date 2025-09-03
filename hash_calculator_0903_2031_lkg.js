// 代码生成时间: 2025-09-03 20:31:48
 * @description A tool to calculate hash values for strings.
 */

(function() {
    // Function to calculate hash value
    function calculateHash(inputString) {
        try {
            if (typeof inputString !== 'string') {
                throw new Error('Input must be a string');
            }

            // Using SHA-256 hash function from the CryptoJS library
            const hashValue = CryptoJS.SHA256(inputString);
            return hashValue.toString(CryptoJS.enc.Hex);

        } catch (error) {
            console.error('Error calculating hash:', error.message);
            return null;
        }
    }

    // Function to display hash on UI
    function displayHash(inputElementId, outputElementId) {
        try {
            const inputElement = document.getElementById(inputElementId);
            const outputElement = document.getElementById(outputElementId);

            if (!inputElement || !outputElement) {
                throw new Error('Invalid input or output element ID');
            }

            const inputString = inputElement.value;
            const hashValue = calculateHash(inputString);

            if (hashValue) {
                outputElement.textContent = hashValue;
            }
        } catch (error) {
            console.error('Error displaying hash:', error.message);
        }
    }

    // Expose the public API
    window.HashCalculator = {
        calculateHash: calculateHash,
        displayHash: displayHash
    };
})();
