// 代码生成时间: 2025-09-21 08:19:23
// 引入必要的模块
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * 检查一个对象是否为空
 * @param {Object} obj - 要检查的对象
 * @returns {boolean} 是否为空
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * 遍历目录并收集文件夹和文件
 * @param {string} dirPath - 目录路径
 * @returns {Promise<Object>} 包含文件夹和文件的对象
 */
function collectDirectoryContents(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        let directoryContents = { folders: [], files: [] };
        files.forEach(file => {
          if (file.isDirectory()) {
            directoryContents.folders.push(file.name);
          } else {
            directoryContents.files.push(file.name);
          }
        });
        resolve(directoryContents);
      }
    });
  });
}

/**
 * 排序文件夹和文件
 * @param {Object} contents - 要排序的文件夹和文件对象
 * @returns {Object} 排序后的对象
 */
function sortDirectoryContents(contents) {
  return {
    folders: contents.folders.sort(),
    files: contents.files.sort()
  };
}

/**
 * 重新排序目录内容
 * @param {string} dirPath - 目录路径
 * @returns {Promise<void>} 排序操作的Promise
 */
function reorderDirectoryContents(dirPath) {
  return collectDirectoryContents(dirPath)
    .then(contents => {
      const sortedContents = sortDirectoryContents(contents);
      console.log(chalk.green(`Folders sorted: ${sortedContents.folders.join(', ')}`));
      console.log(chalk.green(`Files sorted: ${sortedContents.files.join(', ')}`));
    }).catch(error => {
      console.error(chalk.red(`Error while sorting directory contents: ${error.message}`));
    });
}

/**
 * 主程序入口，用于整理指定目录的结构
 * @param {string} directoryPath - 需要整理的目录路径
 */
function main(directoryPath) {
  // 检查路径是否存在
  fs.access(directoryPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(chalk.red(`Directory not found: ${directoryPath}`));
      return;
    }

    // 检查路径是否为目录
    fs.stat(directoryPath, (err, stats) => {
      if (err) {
        console.error(chalk.red(`Error checking directory: ${err.message}`));
        return;
      }
      if (!stats.isDirectory()) {
        console.error(chalk.red('Provided path is not a directory'));
        return;
      }

      // 开始整理目录结构
      reorderDirectoryContents(directoryPath);
    });
  });
}

// 如果该脚本被直接运行，则开始执行
if (require.main === module) {
  const directoryPath = process.argv[2];
  if (!directoryPath) {
    console.error(chalk.red('Please provide a directory path'));
  } else {
    main(directoryPath);
  }
}

// 导出主函数，以便其他模块可以调用
module.exports = main;
