// 代码生成时间: 2025-08-07 13:39:56
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for demonstration purposes
const data = {
  "users": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
  ]
};

// GET endpoint to retrieve all users
app.get('/users', (req, res) => {
  res.status(200).json(data.users);
});

// GET endpoint to retrieve a user by ID
app.get('/users/:id', (req, res) => {
  const user = data.users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ "error": "User not found" });
  }
});

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  // Simple validation - in a real application, you would want more robust validation
  if (!req.body.name) {
    res.status(400).json({ "error": "Name is required" });
  } else {
    const newUser = {
      "id": data.users.length + 1,
      "name": req.body.name
    };
    data.users.push(newUser);
    res.status(201).json(newUser);
  }
});

// PUT endpoint to update an existing user
app.put('/users/:id', (req, res) => {
  const user = data.users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    if (req.body.name) user.name = req.body.name;
    res.status(200).json(user);
  } else {
    res.status(404).json({ "error": "User not found" });
  }
});

// DELETE endpoint to delete a user
app.delete('/users/:id', (req, res) => {
  const userIndex = data.users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex > -1) {
    data.users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ "error": "User not found" });
  }
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ "error": "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/*
 * This is a simple RESTful API server using Express.js, a Node.js framework.
 * It provides endpoints for CRUD operations on a collection of user data.
 * The data is simulated and stored in memory for the purpose of this example.
 * In a production environment, you would likely be interfacing with a database.
 *
 * Endpoints:
 * GET /users - Retrieve all users
 * GET /users/:id - Retrieve a user by ID
 * POST /users - Create a new user
 * PUT /users/:id - Update an existing user
 * DELETE /users/:id - Delete a user
 *
 * Note: This code includes very basic error handling and validation.
 * For a production application, you would need to implement more robust
 * error handling and data validation.
 */