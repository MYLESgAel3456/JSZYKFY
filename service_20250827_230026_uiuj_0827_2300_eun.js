// 代码生成时间: 2025-08-27 23:00:26
const fs = require('fs');
const path = require('path');

/**
 * Function to recursively list all files and folders in a given directory
 * @param {string} directoryPath - The path to the directory to be organized
 * @returns {Promise<Array<string>>} - An array of file paths
 */
function listDirectoryContents(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, dirents) => {
      if (err) {
        reject(err);
      } else {
        const filePaths = dirents.map(dirent => dirent.name);
        resolve(filePaths);
      }
    });
  });
}

/**
 * Function to organize folder structure
 * @param {Array<string>} filesAndFolders - Array of files and folders
 * @param {string} targetDirectory - Target directory to organize
 * @param {string} [baseDirectory] - Base directory for relative paths
 * @returns {Promise<void>} - Resolves when organization is complete
 */
async function organizeFolderStructure(filesAndFolders, targetDirectory, baseDirectory = '') {
  const relativePath = baseDirectory ? path.relative(baseDirectory, targetDirectory) : '';
  // Create the target directory if it does not exist
  await new Promise((resolve, reject) => {
    fs.mkdir(targetDirectory, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  // Process each item in the directory
  for (const item of filesAndFolders) {
    const itemPath = path.join(targetDirectory, relativePath, item);
    try {
      // Check if the item is a directory
      if (fs.existsSync(itemPath) && fs.lstatSync(itemPath).isDirectory()) {
        await organizeFolderStructure(filesAndFolders, itemPath, targetDirectory);
      } else {
        // If it's not a directory, log the item path
        console.log(itemPath);
      }
    } catch (error) {
      console.error(`Error organizing item: ${itemPath}, Error: ${error.message}`);
    }
  }
}

/**
 * Main function to start the organization process
 * @param {string} sourceDirectory - The source directory to organize
 * @param {string} targetDirectory - The target directory where the organization will take place
 */
async function main(sourceDirectory, targetDirectory) {
  try {
    // List all files and folders in the source directory
    const filesAndFolders = await listDirectoryContents(sourceDirectory);
    // Organize the folder structure in the target directory
    await organizeFolderStructure(filesAndFolders, targetDirectory);
    console.log('Folder structure organized successfully.');
  } catch (error) {
    console.error(`Error organizing folder structure: ${error.message}`);
  }
}

// Example usage
main('./sourceDirectory', './targetDirectory');