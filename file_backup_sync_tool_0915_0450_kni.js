// 代码生成时间: 2025-09-15 04:50:23
// Import required modules
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Define the directories for source and destination
const sourceDir = './source';
const destDir = './destination';

// Function to check if a directory exists
const directoryExists = (dirPath) => {
    return fs.existsSync(dirPath);
};

// Function to create a directory if it does not exist
const createDirectory = async (dirPath) => {
    if (!directoryExists(dirPath)) {
        await exec(`mkdir -p ${dirPath}`);
    }
};

// Function to list files in a directory
const listFiles = (dirPath) => {
    return fs.readdirSync(dirPath);
};

// Function to copy a file from source to destination
const copyFile = async (filePath, destPath) => {
    await exec(`cp ${filePath} ${destPath}`);
};

// Function to backup and sync files
const backupAndSyncFiles = async () => {
    try {
        // Create destination directory if it does not exist
        await createDirectory(destDir);

        // List all files in the source directory
        const files = listFiles(sourceDir);

        // Iterate over each file and copy it to the destination directory
        for (const file of files) {
            const filePath = path.join(sourceDir, file);
            const destPath = path.join(destDir, file);
            await copyFile(filePath, destPath);
        }

        console.log('Backup and sync complete.');
    } catch (error) {
        // Handle any errors that occur during the backup and sync process
        console.error('Error during backup and sync:', error.message);
    }
};

// Run the backup and sync function
backupAndSyncFiles();