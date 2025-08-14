// 代码生成时间: 2025-08-14 20:50:48
(function() {
  // ShoppingCart class definition
  class ShoppingCart {
    constructor() {
      this.items = []; // Array to hold cart items
    }

    // Add an item to the cart
    addItem(item) {
      if (!item || typeof item !== 'object') {
        console.error('Invalid item:', item);
        return;
      }
      // Check if the item already exists in the cart
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        // If the item exists, increment the quantity
        existingItem.quantity += item.quantity;
      } else {
        // If the item does not exist, add it to the cart
        this.items.push({ ...item, quantity: item.quantity });
      }
    }

    // Remove an item from the cart
    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    }

    // Get the total price of the cart
    getTotalPrice() {
      return this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }

    // Get the total quantity of items in the cart
    getTotalQuantity() {
      return this.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    }

    // Clear the cart
    clearCart() {
      this.items = [];
    }
  }

  // Expose the ShoppingCart class globally
  window.ShoppingCart = ShoppingCart;
})();

// Example usage:
/*
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Item 1', price: 10, quantity: 1 });
cart.addItem({ id: 2, name: 'Item 2', price: 20, quantity: 2 });
console.log('Total Price:', cart.getTotalPrice()); // 70
console.log('Total Quantity:', cart.getTotalQuantity()); // 3
cart.removeItem(1);
console.log('Total Price after removing item 1:', cart.getTotalPrice()); // 40
cart.clearCart();
console.log('Total Price after clearing cart:', cart.getTotalPrice()); // 0
*/