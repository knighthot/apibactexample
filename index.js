const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());


// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
