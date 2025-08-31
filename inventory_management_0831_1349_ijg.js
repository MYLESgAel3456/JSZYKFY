// 代码生成时间: 2025-08-31 13:49:53
// Define the InventoryManager class
class InventoryManager {
    constructor() {
        this.inventory = []; // Initialize an empty inventory array
    }

    /**
     * Adds an item to the inventory
     * @param {Object} item - The item to be added, containing id, name, and quantity
     */
    addItem(item) {
        if (!item.id || !item.name || !item.quantity) {
            throw new Error('Invalid item data');
        }
        const existingItemIndex = this.inventory.findIndex(i => i.id === item.id);
        if (existingItemIndex > -1) {
            this.inventory[existingItemIndex].quantity += item.quantity;
        } else {
            this.inventory.push(item);
        }
        console.log(`Item added/updated: ${item.name}`);
    }

    /**
     * Removes an item from the inventory by ID
     * @param {string} id - The ID of the item to be removed
     */
    removeItem(id) {
        const existingItemIndex = this.inventory.findIndex(i => i.id === id);
        if (existingItemIndex > -1) {
            this.inventory.splice(existingItemIndex, 1);
            console.log(`Item removed: ${id}`);
        } else {
            throw new Error('Item not found');
        }
    }

    /**
     * Updates the quantity of an item in the inventory
     * @param {string} id - The ID of the item to be updated
     * @param {number} quantity - The new quantity of the item
     */
    updateQuantity(id, quantity) {
        const existingItemIndex = this.inventory.findIndex(i => i.id === id);
        if (existingItemIndex > -1) {
            this.inventory[existingItemIndex].quantity = quantity;
            console.log(`Item quantity updated: ${id}`);
        } else {
            throw new Error('Item not found');
        }
    }

    /**
     * Displays the current inventory
     */
    displayInventory() {
        console.log('Current Inventory:');
        this.inventory.forEach(item => {
            console.log(`ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}`);
        });
    }
}

// Example usage
const inventoryManager = new InventoryManager();

try {
    inventoryManager.addItem({ id: '1', name: 'Apple', quantity: 10 });
    inventoryManager.addItem({ id: '2', name: 'Banana', quantity: 5 });
    inventoryManager.updateQuantity('1', 15);
    inventoryManager.displayInventory();
    inventoryManager.removeItem('2');
    inventoryManager.displayInventory();
} catch (error) {
    console.error(error.message);
}