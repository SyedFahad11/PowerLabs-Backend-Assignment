const fs = require('fs');
const Client=requrire('pg');

const client=new Client(
  {
    // host:'db',
    host:'pgdb', //name given to container during docker build --name
    port:5432,
    user:'postgres',
    password:'1221',
    database:'backendCRUD'

  }
)


async function executeScript(scriptPath) {
  try {
    const script = fs.readFileSync(scriptPath, 'utf8');
    await client.query(script);
    console.log('Initialization script executed successfully.');

  } catch (error) {
    console.error('Error executing initialization script:', error);
  }
}

async function initializeTables() {
  try {

      await executeScript('init.sql');

  } catch (error) {
    console.error('Error initializing tables:', error);
  }
}

initializeTables();
