const express = require("express");
const db=require('../postgres.init.pool');
var jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'ThisIsSecretB$oy';


router.post('/login', async (req, res) => {
  try {

    const { username, password } = req.body;
    const queryText = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id';
    const { rows } = await db.query(queryText, [username, password]);
    const user_id = rows[0].user_id;
    data = {
      user: {
        id: user_id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.status(201).json({ message: 'User registered successfully', user_id, auth_token:authtoken });


  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router;