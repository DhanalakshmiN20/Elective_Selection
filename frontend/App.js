import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import CourseList from './CourseList';  // Assuming you have a CourseList component

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Make a GET request to your backend API
        const response = await Axios.get('http://localhost:5000/api/courses');
        setCourses(response.data); // Set the fetched data to the courses state
      } catch (err) {
        setError('Failed to fetch courses'); // Handle errors
      } finally {
        setLoading(false); // Stop the loading spinner when done
      }
    };

    fetchCourses();
  }, []);  // Empty array means this runs once when the component mounts

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      <h1>Course Registration</h1>
      <CourseList courses={courses} />  {/* Passing courses as props to CourseList */}
    </div>
  );
}

export default App;
