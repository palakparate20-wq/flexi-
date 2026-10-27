// FLEXI Project - Full-Stack Integration Guide (Node.js, Express, MongoDB, React)

/** 
 * BACKEND SETUP (Node.js & MongoDB)
 * File: server.js
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Using MongoDB Compass default local URI)
const mongoURI = 'mongodb://localhost:27017/flexiDB';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected to flexiDB'))
  .catch(err => console.error('Connection Error:', err));

// Schema Definition
const DataSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const FlexiData = mongoose.model('FlexiData', DataSchema);

// API Routes
app.get('/api/data', async (req, res) => {
  try {
    const items = await FlexiData.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const newItem = new FlexiData(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/**
 * FRONTEND SETUP (React.js)
 * File: App.js
 */

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/data');
      setItems(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/data', formData);
      setFormData({ title: '', description: '' });
      fetchData(); // Refresh list
    } catch (err) {
      console.error('Post error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>FLEXI Project Dashboard</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Title" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required 
        />
        <input 
          placeholder="Description" 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required 
        />
        <button type="submit">Add Entry</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.title}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
