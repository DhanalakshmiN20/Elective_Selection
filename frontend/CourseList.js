import React from 'react';
import Axios from 'axios';

function CourseList({ courses }) {
  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      const response = await Axios.post(
        `http://localhost:5000/api/courses/${courseId}/enroll`
      );
      alert(response.data.message); // Show success message
    } catch (error) {
      alert(error.response?.data?.message || 'Error enrolling in course');
    }
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.name}</h3>
            <p>{course.department}</p>
            <p>{course.description}</p>
            <p>Slots Available: {course.slotsAvailable}</p>
            <button onClick={() => handleEnroll(course._id)}>
              Enroll
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
