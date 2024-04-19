const { Pool } = require('pg');


// Create a new pool instance
const pool = new Pool(
  {

    host:'postgres',
    port:5432,
    user:'postgres',
    password:'1221',
    database:'backendCRUD'

  }
);




pool.on('error', (error) => {
  console.error('Error with PostgreSQL Pool:', error);
});

// Export the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
