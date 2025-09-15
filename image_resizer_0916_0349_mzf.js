// 代码生成时间: 2025-09-16 03:49:47
// Import the necessary modules for file handling and D3
const fs = require('fs');
const path = require('path');
const d3 = require('d3-dsv');

/**
 * Resizes an image to the specified dimensions.
 * @param {string} filePath - The path to the image file.
 * @param {number} newWidth - The desired width of the image.
 * @param {number} newHeight - The desired height of the image. * @param {function} callback - A callback function to handle the result.
 */
function resizeImage(filePath, newWidth, newHeight, callback) {
  const image = d3.image();
  image.src(filePath);
  image.then(function(img) {
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    const dataUrl = canvas.toDataURL('image/jpeg');
    callback(null, dataUrl);
  }).catch(function(error) {
    callback(error, null);
  });
}

/**
 * Processes all images in a directory and resizes them.
 * @param {string} directoryPath - The path to the directory containing the images.
 * @param {number} newWidth - The desired width of the images.
 * @param {number} newHeight - The desired height of the images.
 * @param {function} callback - A callback function to handle the result.
 */
function batchResizeImages(directoryPath, newWidth, newHeight, callback) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      callback(err, null);
      return;
    }
    const promises = files.map(file => {
      const filePath = path.join(directoryPath, file);
      return new Promise((resolve, reject) => {
        resizeImage(filePath, newWidth, newHeight, (err, resizedImage) => {
          if (err) {
            reject(err);
          } else {
            resolve(resizedImage);
          }
        });
      });
    });
    Promise.all(promises).then(resizedImages => {
      callback(null, resizedImages);
    }).catch(err => {
      callback(err, null);
    });
  });
}

// Example usage:
batchResizeImages('/path/to/images', 800, 600, (err, resizedImages) => {
  if (err) {
    console.error('Error resizing images:', err);
  } else {
    console.log('Resized images:', resizedImages);
  }
});