const express = require("express");
const db=require('../postgres.init.pool');
const fetchUser=require('../middleware/fetchUser');

const router = express.Router();

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

router.post('/assignments',fetchUser, async (req, res) => {
  try {
    const teacher_id=req.user.id;

     const { title, description, due_date, total_score } = req.body;

     const queryText = `
       INSERT INTO assignments (title, description, due_date, total_score, teacher_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING assignment_id`;

     const { rows } = await db.query(queryText, [title, description, due_date, total_score, teacher_id]);

     const assignment_id = rows[0].assignment_id;

     res.status(201).json({ message: 'Assignment created successfully', assignment_id });


  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

router.post('/assignments/submit/:assignment_id', fetchUser, async (req, res) => {
  try {
    const assignmentId = req.params.assignment_id;
    const studentId = req.user.id;
    const { content } = req.body;

    const queryText = 'INSERT INTO submissions (assignment_id, student_id, content) VALUES ($1, $2, $3) RETURNING submission_id';
    const { rows } = await db.query(queryText, [assignmentId, studentId, content]);


    const submissionId = rows[0].submission_id;

    res.status(201).json({ message: 'Assignment submitted successfully', submission_id: submissionId });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

router.get('/assignments', async (req, res) => {

  function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  try {

    const { due_date, total_score, sort_by } = req.query;


    if (due_date && !isValidDateFormat(due_date)) {
      return res.status(400).json({ error: 'Invalid due_date format. Please provide the date in YYYY-MM-DD format.' });
    }

    let queryText = 'SELECT * FROM assignments WHERE 1=1';

    if (due_date)
      queryText += ` AND due_date <= '${due_date}'`;

    if (total_score)
      queryText += ` AND total_score >= ${total_score}`;


    if (sort_by === 'due_date') {
      queryText += ' ORDER BY due_date';
    } else if (sort_by === 'total_score') {
      queryText += ' ORDER BY total_score';
    }

    const { rows } = await db.query(queryText);

    res.status(200).json(rows);


  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

router.put('/assignments/:assignment_id', fetchUser, async (req, res) => {
  try {

    const assignmentId = req.params.assignment_id;
    const userId = req.user.id;

    const assignment = await db.query('SELECT teacher_id FROM assignments WHERE assignment_id = $1', [assignmentId]);
    if (!assignment.rows.length) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    if (assignment.rows[0].teacher_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this assignment' });
    }

    const { title, description, due_date, total_score } = req.body;
    const queryText = 'UPDATE assignments SET title = $1, description = $2, due_date = $3, total_score = $4 WHERE assignment_id = $5';
    await db.query(queryText, [title, description, due_date, total_score, assignmentId]);

    res.status(200).json({ message: 'Assignment updated successfully' });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

router.delete('/assignments/:assignment_id', fetchUser, async (req, res) => {
  try {

    const assignmentId = req.params.assignment_id;
    const userId = req.user.id;

    const assignment = await db.query('SELECT teacher_id FROM assignments WHERE assignment_id = $1', [assignmentId]);
    if (!assignment.rows.length) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    if (assignment.rows[0].teacher_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this assignment' });
    }

    await db.query('DELETE FROM assignments WHERE assignment_id = $1', [assignmentId]);

    res.status(200).json({ message: 'Assignment deleted successfully' });


  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router;