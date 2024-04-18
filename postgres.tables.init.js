const { Pool } = require('pg');
const fs = require('fs');

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: 'postgresql://username:password@localhost:5432/database_name'
});

// Function to execute SQL script
async function executeScript(scriptPath) {
  try {
    const script = fs.readFileSync(scriptPath, 'utf8');
    await pool.query(script);
    console.log('Initialization script executed successfully.');
  } catch (error) {
    console.error('Error executing initialization script:', error);
  }
}

// Check if tables exist
async function tablesExist() {
  const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')");
  return result.rows[0].exists;
}

// Initialize tables
async function initializeTables() {
  try {
    const tablesExist = await tablesExist();
    if (!tablesExist) {
      await executeScript('initialize.sql'); // Path to your initialization script
    } else {
      console.log('Tables already exist. Skipping initialization.');
    }
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
}

// Initialize tables when the backend loads up
initializeTables();
