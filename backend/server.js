const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API endpoint example
app.get('/api/pokemon', (req, res) => {
  res.json({ message: 'Welcome to the POKEMMO Helper API!' });
});

// Serve the frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
