const express = require("express");
const db=require('../postgres.pool.init');

const router = express.Router();


router.get('/assignments', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM assignments');
    res.json(rows);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports=router;