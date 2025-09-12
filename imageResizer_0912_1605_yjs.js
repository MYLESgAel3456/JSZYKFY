// 代码生成时间: 2025-09-12 16:05:40
// Importing the D3.js library
const d3 = require('d3');

// Function to resize an image
function resizeImage(imageSrc, width, height, callback) {
  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const resizedImage = canvas.toDataURL('image/png');
    callback(null, resizedImage);
  };
  img.onerror = function() {
    callback(new Error('Failed to load image'), null);
  };
  img.src = imageSrc;
}

// Function to apply the resizing to all images in a given container
function resizeImagesInContainer(containerSelector, width, height) {
  const container = d3.select(containerSelector);
  container.selectAll('img')
    .each(function() {
      const img = d3.select(this);
      const originalSrc = img.attr('src');
      resizeImage(originalSrc, width, height, function(err, resizedSrc) {
        if (err) {
          console.error('Error resizing image:', err);
          return;
        }
        img.attr('src', resizedSrc);
      });
    });
}

// Example usage
// d3.select('#images').selectAll('img').each(function() {
//   const img = d3.select(this);
//   const originalSrc = img.attr('src');
//   resizeImage(originalSrc, 100, 100, function(err, resizedSrc) {
//     if (err) {
//       console.error('Error resizing image:', err);
//       return;
//     }
//     img.attr('src', resizedSrc);
//   });
// });

// Resize all images in the container with the ID 'images' to 200x200
resizeImagesInContainer('#images', 200, 200);
