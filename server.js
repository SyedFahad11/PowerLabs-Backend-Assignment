const express = require('express');
const db = require('./postgres.pool.init'); // Import the connection pool
const SchemaInit=require('./postgres.tables.init');
const path = require('path');



const app = express();

//SchemaInit();

app.use('/auth',require("./routes/Auth"));
app.use('/api',require("./routes/Api"));



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
