// 代码生成时间: 2025-09-21 03:35:48
// 引入D3库
const d3 = require('d3');

/**
 * 转换JSON数据格式
 * @param {Object} jsonData - 要转换的原始JSON数据
 * @param {Object} transformationRules - 转换规则对象
 * @returns {Object} - 转换后的JSON数据
 */
function transformJsonData(jsonData, transformationRules) {
  // 验证输入
  if (typeof jsonData !== 'object' || jsonData === null) {
    throw new Error('Invalid JSON data: Expected an object.');
  }
  if (typeof transformationRules !== 'object' || transformationRules === null) {
    throw new Error('Invalid transformation rules: Expected an object.');
  }

  // 深拷贝原始数据，以避免直接修改原始对象
  const transformedData = JSON.parse(JSON.stringify(jsonData));

  // 应用转换规则
  for (const [key, transformation] of Object.entries(transformationRules)) {
    if (typeof transformation === 'function') {
      transformedData[key] = transformation(transformedData[key]);
    } else {
      // 如果转换规则不是函数，则尝试应用简单的路径替换
      const pathParts = key.split('.');
      let currentObject = transformedData;
      for (let i = 0; i < pathParts.length - 1; i++) {
        currentObject = currentObject[pathParts[i]];
      }
      currentObject[pathParts[pathParts.length - 1]] = transformation;
    }
  }

  return transformedData;
}

// 示例转换规则
const exampleTransformationRules = {
  'name': 'John Doe', // 直接替换name属性
  'address.street': '123 Main St', // 替换嵌套对象的属性
  'age': function(age) { return age + 1; } // 函数转换年龄属性
};

// 示例JSON数据
const exampleJsonData = {
  name: 'Jane Doe',
  age: 30,
  address: {
    street: '456 Elm St'
  }
};

// 执行转换
try {
  const result = transformJsonData(exampleJsonData, exampleTransformationRules);
  console.log('Transformed JSON:', result);
} catch (error) {
  console.error('Error transforming JSON:', error.message);
}
