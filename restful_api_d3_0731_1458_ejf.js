// 代码生成时间: 2025-07-31 14:58:00
const express = require('express');
const d3 = require('d3-fetch');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define a RESTful API
const data = [{
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
}, {
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com'
}];

// GET /api/users - Retrieve all users
app.get('/api/users', (req, res) => {
  res.status(200).json(data);
});

// GET /api/users/:id - Retrieve a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = data.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
  res.status(200).json(user);
});

// POST /api/users - Create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: data.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  data.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update an existing user by ID
app.put('/api/users/:id', (req, res) => {
  const user = data.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.status(200).json(user);
});

// DELETE /api/users/:id - Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const index = data.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
  data.splice(index, 1);
  res.status(200).json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});