const express = require("express");
const db=require('../postgres.pool.init');

const router = express.Router();


router.post('/login', async (req, res) => {
  try {

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router;