// 代码生成时间: 2025-08-15 00:46:14
const d3 = require('d3');
const fs = require('fs');
const path = require('path');

/**
 * Main function to start the batch file renamer
 * @param {string} directoryPath - The path to the directory containing files to rename.
 * @param {string} renamePattern - The pattern to rename the files with.
 */
function batchRename(directoryPath, renamePattern) {
  // Check if directoryPath is valid
  if (!fs.existsSync(directoryPath)) {
    console.error('Error: Directory does not exist.');
    return;
  }

  // Check if renamePattern is a valid function
  if (typeof renamePattern !== 'function') {
    console.error('Error: renamePattern must be a function.');
    return;
  }

  // Read all files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Rename each file
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      // Check if it's a file
      if (fs.statSync(filePath).isFile()) {
        const newName = renamePattern(file);
        if (newName) {
          const newFilePath = path.join(directoryPath, newName);
          fs.rename(filePath, newFilePath, err => {
            if (err) {
              console.error(`Error renaming ${file} to ${newName}:`, err);
            } else {
              console.log(`Renamed ${file} to ${newName}`);
            }
          });
        } else {
          console.error('Error: renamePattern did not return a new name for file:', file);
        }
      }
    });
  });
}

/**
 * Example rename pattern function
 * This function simply adds '_renamed' to the end of the file name.
 * @param {string} fileName - The original file name.
 * @returns {string} - The new file name.
 */
function simpleRenamePattern(fileName) {
  const ext = path.extname(fileName);
  const name = path.basename(fileName, ext);
  return `${name}_renamed${ext}`;
}

// Usage example:
// batchRename('/path/to/directory', simpleRenamePattern);

// Export the main function for testing or other use cases
module.exports = { batchRename, simpleRenamePattern };
