require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
let items = [
  { id: 1, name: "Sample Item", description: "This is a sample item", price: 9.99, createdAt: new Date(), updatedAt: new Date() }
];
let currentId = 2;

// API Routes - Define these BEFORE static file serving
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

// GET /api/items - Get all items
app.get('/api/items', (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/items/:id - Get a single item
app.get('/api/items/:id', (req, res) => {
  try {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/items - Create a new item
app.post('/api/items', (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    // Validation
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    
    const newItem = {
      id: currentId++,
      name,
      description: description || '',
      price: parseFloat(price),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/items/:id - Update an item
app.put('/api/items/:id', (req, res) => {
  try {
    const { name, description, price } = req.body;
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    items[index] = {
      ...items[index],
      name: name || items[index].name,
      description: description || items[index].description,
      price: price ? parseFloat(price) : items[index].price,
      updatedAt: new Date()
    };
    
    res.json(items[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/items/:id - Delete an item
app.delete('/api/items/:id', (req, res) => {
  try {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    items.splice(index, 1);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other requests by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Items endpoint: http://localhost:${PORT}/api/items`);
});
