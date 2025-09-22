// 代码生成时间: 2025-09-22 15:03:25
// restful_api_with_d3.js
// 使用JS和D3框架创建RESTful API接口

const express = require('express'); // 引入Express框架
const app = express();
const port = 3000; // 定义端口

// 用于存储数据的简单数组
const data = [];

// 中间件：解析JSON请求体
app.use(express.json());

// 获取所有数据的接口
app.get('/api/data', (req, res) => {
  res.status(200).json(data); // 返回所有数据
});

// 创建一个数据的接口
app.post('/api/data', (req, res) => {
  const newData = req.body;
  if (!newData) {
    return res.status(400).send('请求体不能为空');
  }
  data.push(newData);
  res.status(201).send('数据创建成功');
});

// 获取单个数据的接口
app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (!item) {
    return res.status(404).send('未找到数据');
  }
  res.status(200).json(item);
});

// 更新一个数据的接口
app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let found = false;
  const updatedData = data.map((item) => {
    if (item.id === id) {
      found = true;
      return { ...item, ...req.body };
    }
    return item;
  });
  if (!found) {
    return res.status(404).send('未找到数据');
  }
  res.status(200).send('数据更新成功');
});

// 删除一个数据的接口
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).send('未找到数据');
  }
  data.splice(index, 1);
  res.status(200).send('数据删除成功');
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});

// 启动服务器
app.listen(port, () => {
  console.log(`RESTful API服务器运行在 http://localhost:${port}`);
});