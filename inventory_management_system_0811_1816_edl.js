// 代码生成时间: 2025-08-11 18:16:23
// Define the Inventory class to manage inventory items
class Inventory {
    constructor() {
        this.items = []; // Array to store inventory items
    }

    // Add a new item to the inventory
    addItem(item) {
        if (!item || typeof item !== 'object') {
            throw new Error('Invalid item data');
        }
        this.items.push(item);
        console.log(`Item added: ${JSON.stringify(item)}`);
    }

    // Remove an item from the inventory by its ID
    removeItem(itemId) {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index === -1) {
            throw new Error('Item not found');
        }
        this.items.splice(index, 1);
        console.log(`Item removed: ID = ${itemId}`);
    }

    // Update an existing item in the inventory
    updateItem(itemId, newItem) {
        if (!newItem || typeof newItem !== 'object') {
            throw new Error('Invalid new item data');
        }
        const index = this.items.findIndex(item => item.id === itemId);
        if (index === -1) {
            throw new Error('Item not found');
        }
        this.items[index] = newItem;
        console.log(`Item updated: ID = ${itemId}`);
    }

    // Get all items in the inventory
    getItems() {
        return this.items;
    }

    // Get a specific item by its ID
    getItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) {
            throw new Error('Item not found');
        }
        return item;
    }
}

// Example usage
try {
    const inventory = new Inventory();
    inventory.addItem({ id: 1, name: 'Apple', quantity: 10 });
    inventory.addItem({ id: 2, name: 'Banana', quantity: 20 });
    inventory.updateItem(1, { id: 1, name: 'Green Apple', quantity: 15 });
    console.log(inventory.getItems());
    inventory.removeItem(2);
    console.log(inventory.getItems());
} catch (error) {
    console.error('Error:', error.message);
}