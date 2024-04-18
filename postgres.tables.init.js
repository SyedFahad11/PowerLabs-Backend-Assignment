const fs = require('fs');
const db = require('./postgres.pool.init');



// Function to execute SQL script
async function executeScript(scriptPath) {
  try {
    const script = fs.readFileSync(scriptPath, 'utf8');
    await db.query(script);
    console.log('Initialization script executed successfully.');
  } catch (error) {
    console.error('Error executing initialization script:', error);
  }
}


// Check if tables exist
async function tablesExist() {
  const result = await db.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')");
  return result.rows[0].exists;
}

// Initialize tables
async function initializeTables() {
  try {
    const tablesExists = await tablesExist();
    if (!tablesExists) {
      await executeScript('initialize.sql');
    } else {
      console.log('Tables already exist. Skipping initialization.');
    }
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
}

// Initialize tables when the backend loads up
module.exports =initializeTables;
