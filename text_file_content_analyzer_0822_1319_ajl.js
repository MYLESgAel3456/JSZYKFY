// 代码生成时间: 2025-08-22 13:19:36
 * Features:
 * - Reads the file content
 * - Calculates word count
 * - Calculates character count
 * - Calculates line count
 * 
 * Usage:
 * 1. Place the text file in the same directory as this script.
 * 2. Run the script using Node.js.
 * 3. The program will output the analysis results in the console.
 * 
 * @author [Your Name]
 * @version 1.0
 */

const fs = require('fs');
const d3 = require('d3');

// Function to read the file content
function readFileContent(filePath) {
    try {
        // Read the file content synchronously
        const content = fs.readFileSync(filePath, 'utf8');
        return content;
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
}

// Function to analyze the file content
function analyzeContent(content) {
    // Split the content into words
    const words = content.split(/\s+/);
    
    // Calculate word count
    const wordCount = words.length;
    
    // Calculate character count (excluding spaces)
    const charCount = content.length;
    
    // Calculate line count
    const lineCount = content.split('
').length;
    
    // Return the analysis results
    return {
        wordCount,
        charCount,
        lineCount
    };
}

// Function to display the analysis results
function displayResults(results) {
    console.log(`Word Count: ${results.wordCount}`);
    console.log(`Character Count: ${results.charCount}`);
    console.log(`Line Count: ${results.lineCount}`);
}

// Main function to run the program
function main() {
    // Define the file path
    const filePath = 'example.txt';
    
    // Read the file content
    const content = readFileContent(filePath);
    
    // Analyze the file content
    const results = analyzeContent(content);
    
    // Display the analysis results
    displayResults(results);
}

// Run the program
main();