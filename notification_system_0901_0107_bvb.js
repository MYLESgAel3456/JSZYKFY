// 代码生成时间: 2025-09-01 01:07:50
 * easily integrated into web applications.
 */

(function() {
  "use strict";

  // Define the Notification class
  class Notification {
    constructor(eventType) {
      this.eventType = eventType;
      this.message = "";
    }

    // Set the message to be displayed
    setMessage(message) {
      this.message = message;
    }

    // Display the notification to the user
    display() {
      // Check if message is set
      if (!this.message) {
        throw new Error("Message is not set.");
      }

      // Create a new notification element
      const notificationElement = document.createElement("div");
      notificationElement.textContent = this.message;
      notificationElement.className = `notification ${this.eventType}`;
      document.body.appendChild(notificationElement);

      // Remove the notification after 5 seconds
      setTimeout(() => {
        notificationElement.remove();
      }, 5000);
    }
  }

  // Expose the Notification class globally
  window.Notification = Notification;

  // Example usage
  const infoNotification = new Notification("info");
  infoNotification.setMessage("This is an info message.");
  infoNotification.display();

  const errorNotification = new Notification("error");
  errorNotification.setMessage("This is an error message.");
  errorNotification.display();

})();
