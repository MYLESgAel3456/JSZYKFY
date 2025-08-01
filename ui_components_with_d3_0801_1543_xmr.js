// 代码生成时间: 2025-08-01 15:43:00
// 引入D3.js库
const d3 = require('d3');

/**
 * UI组件库
 */
class UIComponentLibrary {
  /**
   * 构造函数
   * @param {string} selector 选择器，用于绑定D3选择器
   */
  constructor(selector) {
    this.selector = selector;
    this.svg = d3.select(selector).append('svg')
      .attr('width', '100%')
      .attr('height', '100%');
  }

  /**
   * 添加按钮组件
   * @param {object} options 按钮配置
   */
  addButton(options) {
    try {
      const { text, x, y, width, height, onClick } = options;

      // 创建按钮
      const button = this.svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'blue')
        .attr('stroke', 'black');

      // 添加文本
      this.svg.append('text')
        .attr('x', x + width / 2)
        .attr('y', y + height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text(text);

      // 添加事件监听
      button.on('click', () => {
        if (typeof onClick === 'function') {
          onClick();
        } else {
          console.error('onClick callback is not a function');
        }
      });

    } catch (error) {
      console.error('Error adding button:', error);
    }
  }

  /**
   * 添加文本框组件
   * @param {object} options 文本框配置
   */
  addTextBox(options) {
    try {
      const { x, y, width, height } = options;

      // 创建文本框
      this.svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'none')
        .attr('stroke', 'black');

      // 添加文本
      this.svg.append('text')
        .attr('x', x + width / 2)
        .attr('y', y + height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text('Enter text here');

    } catch (error) {
      console.error('Error adding text box:', error);
    }
  }
}

// 使用示例
const uiLibrary = new UIComponentLibrary('#ui-container');

// 添加按钮
uiLibrary.addButton({
  text: 'Click me',
  x: 100,
  y: 100,
  width: 120,
  height: 40,
  onClick: () => {
    console.log('Button clicked');
  }
});

// 添加文本框
uiLibrary.addTextBox({
  x: 100,
  y: 200,
  width: 200,
  height: 40
});