const express = require("express");
const db=require('../postgres.pool.init');
const fetchUser=require('../middleware/fetchUser');

const router = express.Router();


router.post('/assignments',fetchUser, async (req, res) => {
  try {

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/assignments/submit/{assignment_id}', fetchUser, async (req, res) => {
  try {

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/assignments', async (req, res) => {
  try {

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/assignments/{assignment_id}', fetchUser, async (req, res) => {
  try {

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/assignments/{assignment_id}', fetchUser, async (req, res) => {
  try {

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router;