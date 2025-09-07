// 代码生成时间: 2025-09-07 20:03:29
// form_validator.js
// 一个简单的表单验证器，使用JavaScript和D3.js

// 引入D3库
const d3 = require('d3');

// 表单验证器构造函数
function FormValidator(formId) {
  // 存储表单元素
  this.form = d3.select('#' + formId);
  this.inputFields = this.form.selectAll('input');
}

// 验证函数
FormValidator.prototype.validate = function() {
  // 定义验证规则
  let rules = {
    email: /^[\w.-]+@[^\.@]+\.[^\.@]{2,6}$/,
    password: /.{6,}/
  };
  
  // 定义错误消息
  let errorMessages = {
    email: 'Email address is invalid.',
    password: 'Password must be at least 6 characters long.'
  };
  
  // 用于存储验证结果的数组
  let validationResults = [];

  // 遍历表单中的输入字段
  this.inputFields.each(function(d, i) {
    let input = d3.select(this);
    let value = input.property('value');
    let isValid = true;
    let type = input.attr('type');

    // 根据输入字段类型应用不同的验证规则
    if (type === 'email') {
      isValid = rules.email.test(value);
    } else if (type === 'password') {
      isValid = rules.password.test(value);
    }

    // 如果验证失败，存储错误消息
    if (!isValid) {
      validationResults.push({
        field: input.attr('name'),
        message: errorMessages[type] || 'Invalid input.'
      });
    }
  });

  // 返回验证结果
  return validationResults;
};

// 显示错误消息的函数
FormValidator.prototype.showErrors = function(errors) {
  // 假设有一个用于显示错误消息的元素
  let errorContainer = d3.select('#errors');
  errorContainer.html('');

  errors.forEach(function(error) {
    errorContainer.append('p')
      .text(error.message);
  });
};

// 使用示例
const formValidator = new FormValidator('myForm');

// 表单提交事件
function onSubmit() {
  let errors = formValidator.validate();
  if (errors.length > 0) {
    formValidator.showErrors(errors);
  } else {
    console.log('Form is valid!');
    // 你可以在这里添加表单提交的代码
  }
  return false; // 阻止表单默认提交行为
}

// 绑定表单提交事件
d3.select('#myForm').on('submit', onSubmit);