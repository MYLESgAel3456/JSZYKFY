// 代码生成时间: 2025-09-10 08:50:41
const fs = require('fs');
const JSZip = require('jszip');

// 压缩文件解压工具
class ZipDecompressor {
  // 构造函数，接收一个文件路径
  constructor(filePath) {
    this.filePath = filePath;
  }

  // 解压ZIP文件到指定目录
  async extractZip(directoryPath) {
    try {
      // 读取ZIP文件内容
      const fileContent = await fs.promises.readFile(this.filePath);

      // 使用JSZip解压文件
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(fileContent);

      // 提取文件到指定目录
      await zipContent.generateNodeStream({
         streamFiles: true,
         compression: 'STORE',
         dir: directoryPath,
      });

      console.log('ZIP文件解压成功');
    } catch (error) {
      console.error('解压ZIP文件失败', error);
    }
  }
}

// 使用示例
(async () => {
  try {
    // 创建ZIP解压工具实例
    const zipDecompressor = new ZipDecompressor('path/to/your/zip_file.zip');
    
    // 指定解压到的目录路径
    const extractDirectory = 'path/to/extract/directory';
    
    // 执行解压操作
    await zipDecompressor.extractZip(extractDirectory);
  } catch (error) {
    console.error('ZIP解压工具使用错误', error);
  }
})();