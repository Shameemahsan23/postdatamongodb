// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/work', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema and model
const dataSchema = new mongoose.Schema({
  content: String,
  name: String,
  dob: String,
});

const Data = mongoose.model('Data', dataSchema);

// API endpoint to handle POST requests
app.post('/api/save-data', async (req, res) => {
  const { content, name, dob } = req.body;

  try {
    const newData = new Data({ content, name, dob });
    await newData.save();
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
