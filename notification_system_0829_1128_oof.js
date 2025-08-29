// 代码生成时间: 2025-08-29 11:28:03
// Import D3.js if not included in the environment
// const d3 = require('d3');

/**
 * Notification class
 * Manages the creation and display of a single notification
 */
class Notification {
  constructor(message, type) {
    this.message = message;
    this.type = type || 'info'; // Default type is 'info'
  }

  /**
   * Display the notification on the page
   */
  display() {
    try {
      // Create a new SVG element and append to the body
      const svg = d3.select('body').append('svg')
        .attr('width', 300)
        .attr('height', 100)
        .style('position', 'absolute')
        .style('top', '20px')
        .style('right', '20px');

      // Add a rectangle for the notification background
      svg.append('rect')
        .attr('width', 290)
        .attr('height', 90)
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('fill', this.type === 'error' ? '#ff4d4d' : '#52c41a');

      // Add a text element for the message
      svg.append('text')
        .attr('x', 10)
        .attr('y', 50)
        .attr('font-family', 'Arial')
        .attr('font-size', 14)
        .attr('fill', '#fff')
        .text(this.message);

      // Remove the notification after 3 seconds
      setTimeout(() => {
        svg.remove();
      }, 3000);
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }
}

/**
 * NotificationManager class
 * Manages multiple notifications and their display
 */
class NotificationManager {
  constructor() {
    this.notifications = [];
  }

  /**
   * Add a new notification to the list and display it
   * @param {string} message - The message to display in the notification
   * @param {string} type - The type of notification (e.g., 'info', 'error')
   */
  addNotification(message, type) {
    const notification = new Notification(message, type);
    this.notifications.push(notification);
    notification.display();
  }
}

// Example usage
const notificationManager = new NotificationManager();
notificationManager.addNotification('Hello, this is a notification!', 'info');
notificationManager.addNotification('Error: Something went wrong.', 'error');