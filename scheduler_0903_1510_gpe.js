// 代码生成时间: 2025-09-03 15:10:30
 * This scheduler allows the addition, removal, and execution of tasks at specified intervals.
 */

// Define the Scheduler class
class Scheduler {
  constructor() {
    // Store tasks in an array for easy management
    this.tasks = [];
  }

  /**
   * Adds a new task to the scheduler.
   * @param {Function} task - The task function to be executed.
   * @param {number} interval - The interval at which the task should run (in milliseconds).
   */
  addTask(task, interval) {
    if (typeof task !== 'function') {
      throw new Error('The task must be a function.');
    }
    if (interval <= 0) {
      throw new Error('The interval must be a positive number.');
    }

    // Create a new interval for the task
    const newTask = setInterval(task, interval);

    // Keep track of the interval ID to allow task removal
    this.tasks.push({ task, intervalId: newTask });
  }

  /**
   * Removes a task from the scheduler.
   * @param {Function} task - The task function to be removed.
   */
  removeTask(task) {
    const taskIndex = this.tasks.findIndex(t => t.task === task);
    if (taskIndex === -1) {
      throw new Error('Task not found in scheduler.');
    }

    // Clear the interval and remove the task from the array
    clearInterval(this.tasks[taskIndex].intervalId);
    this.tasks.splice(taskIndex, 1);
  }

  /**
   * Executes all tasks immediately, regardless of their schedule.
   */
  executeAllTasks() {
    this.tasks.forEach(task => task.task());
  }
}

// Example usage:
const scheduler = new Scheduler();

// Define a sample task function
function sampleTask() {
  console.log('Sample task executed at:', new Date().toISOString());
}

// Add the task to the scheduler to run every 5 seconds
scheduler.addTask(sampleTask, 5000);

// Optionally, execute all tasks immediately
// scheduler.executeAllTasks();

// Later, if you want to remove the task
// scheduler.removeTask(sampleTask);
