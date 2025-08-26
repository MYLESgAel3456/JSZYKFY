// 代码生成时间: 2025-08-26 21:09:14
// Define the User model with permissions
class User {
    constructor(id, username, permissions) {
        this.id = id;           // Unique identifier for the user
        this.username = username; // Username of the user
        this.permissions = permissions; // Permissions granted to the user
    }

    // Check if the user has a specific permission
    hasPermission(permission) {
        return this.permissions.includes(permission);
    }
}

// Access Control Manager
class AccessControlManager {
    constructor() {
        this.users = {}; // Stores users with their IDs as keys
    }

    // Add or update a user in the system
    addUser(id, username, permissions) {
        if (this.users[id]) {
            console.warn(`User with ID ${id} already exists.`);
            return;
        }
        this.users[id] = new User(id, username, permissions);
    }

    // Remove a user from the system
    removeUser(id) {
        if (!this.users[id]) {
            console.error(`User with ID ${id} does not exist.`);
            return;
        }
        delete this.users[id];
    }

    // Check if a user has a specific permission
    checkPermission(id, permission) {
        const user = this.users[id];
        if (!user) {
            console.error(`User with ID ${id} does not exist.`);
            return false;
        }
        return user.hasPermission(permission);
    }
}

// Example usage
const accessControl = new AccessControlManager();
accessControl.addUser(1, 'admin', ['read', 'write', 'delete']);
accessControl.addUser(2, 'editor', ['read', 'write']);

// Check permissions
console.log(accessControl.checkPermission(1, 'write')); // true
console.log(accessControl.checkPermission(2, 'delete')); // false

// Remove a user
accessControl.removeUser(1); // Removes user with ID 1
