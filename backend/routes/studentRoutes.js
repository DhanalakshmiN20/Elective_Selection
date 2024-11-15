const express = require('express');
const Student = require('../models/student'); // Ensure the path is correct
const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.json(students); // Return the students as JSON
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

// POST new student
router.post('/', async (req, res) => {
  const { name, email, age, department, courses } = req.body;

  const student = new Student({
    name,
    email,
    age,
    department,
    courses
  });

  try {
    const newStudent = await student.save(); // Save the new student to the database
    res.status(201).json(newStudent); // Return the newly created student
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

module.exports = router;
