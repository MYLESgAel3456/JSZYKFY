// 代码生成时间: 2025-08-19 01:25:56
const puppeteer = require('puppeteer');

// 函数：抓取网页内容
async function scrapeWebContent(url) {
  // 错误处理
  try {
    // 使用 Puppeteer 启动浏览器
    const browser = await puppeteer.launch();
    // 创建一个新页面
    const page = await browser.newPage();
    // 导航到目标 URL
    await page.goto(url, { waitUntil: 'networkidle0' });
    // 获取页面内容
    const content = await page.content();
    // 关闭浏览器
    await browser.close();
    // 返回内容
    return content;
  } catch (error) {
    // 打印错误信息
    console.error('An error occurred while scraping:', error);
    throw error;
  }
}

// 使用示例：抓取 Bing 主页内容
scrapeWebContent('https://www.bing.com')
  .then(content => console.log(content))
  .catch(error => console.error('Scraping failed:', error));