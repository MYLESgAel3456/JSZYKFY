// 代码生成时间: 2025-08-30 07:56:23
const inventory = [];

// Item class to represent inventory items
class Item {
  constructor(id, name, quantity) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }

  // Method to update item quantity
  updateQuantity(newQuantity) {
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative.');
    }
    this.quantity = newQuantity;
  }
}

// Inventory management functions

/**
 * Adds an item to the inventory
 *
 * @param {Item} item - The item to be added
 */
function addItem(item) {
  if (!(item instanceof Item)) {
    throw new Error('Invalid item object.');
  }
  inventory.push(item);
  console.log(`Item added: ${item.name}`);
}

/**
 * Removes an item from the inventory by ID
 *
 * @param {number} id - The ID of the item to be removed
 */
function removeItemById(id) {
  const index = inventory.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error('Item not found.');
  }
  inventory.splice(index, 1);
  console.log(`Item removed: ${inventory[index].name}`);
}

/**
 * Updates the quantity of an item in the inventory
 *
 * @param {number} id - The ID of the item to update
 * @param {number} newQuantity - The new quantity of the item
 */
function updateItemQuantity(id, newQuantity) {
  const item = inventory.find(item => item.id === id);
  if (!item) {
    throw new Error('Item not found.');
  }
  try {
    item.updateQuantity(newQuantity);
    console.log(`Item quantity updated: ${item.name} to ${item.quantity}`);
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Displays the current inventory state
 */
function displayInventory() {
  console.log('Current Inventory State:');
  inventory.forEach(item => {
    console.log(`ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}`);
  });
}

// Example usage
try {
  const item1 = new Item(1, 'Apple', 50);
  const item2 = new Item(2, 'Banana', 30);
  
  addItem(item1);
  addItem(item2);
  
  updateItemQuantity(1, 45);
  
  removeItemById(2);
  
  displayInventory();
} catch (error) {
  console.error('An error occurred:', error.message);
}