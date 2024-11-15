const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll a student in a course
router.post('/:id/enroll', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if there are available slots
    if (course.slotsAvailable <= course.studentsEnrolled) {
      return res.status(400).json({ message: 'No available slots' });
    }

    course.studentsEnrolled += 1;
    await course.save();

    res.json({ message: 'Student enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
