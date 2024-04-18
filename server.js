const express = require('express');
const db = require('./postgres.pool.init'); // Import the connection pool
const SchemaInit=require('./postgres.tables.init');

const app = express();

//SchemaInit();

// Example route to fetch assignments
app.get('/assignments', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM assignments');
    res.json(rows);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
