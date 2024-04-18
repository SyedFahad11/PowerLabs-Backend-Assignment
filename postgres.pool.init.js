/* const {Client}=require('pg')
const client=new Client(
  {
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"1221",
    database:"postgres"
  }
)
client.connect();
client.query('select * from users',(err,res)=>{
  if(!err){
    console.log(res.rows);
  }
  else{
    console.log(err.message);
  }
  client.end;
})
 */

const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool(
  {
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"1221",
    database:"postgres"
  }
);

pool.on('error', (error) => {
  console.error('Error with PostgreSQL Pool:', error);
});

// Export the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
