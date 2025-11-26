import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'

const ViewStudent = () => {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate(); 
   
  function fetchStudents() {
    setLoading(true)
    axios.get('http://localhost:5000/users')
    .then((response) => {
      setStudents(response.data); 
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching student data:', error);
      setLoading(false)
    });
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleupdate = (id) => {
    navigate(`/update/${id}`);
  } 

  const handledelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      });
    }
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.mail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-container">
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="view-section">
        <div className="view-header">
          <h1 className="view-title">📋 Student Directory</h1>
          <p className="view-subtitle">Manage and view all registered students</p>
        </div>

        <div className="search-bar">
          <input 
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="student-count">{filteredStudents.length} students found</span>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="no-students">
            <h2>No Students Found</h2>
            <p>Start by adding your first student</p>
            <button className="btn-add-first" onClick={() => navigate('/add')}>
              ➕ Add Student
            </button>
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <div key={student.id} className="student-card">
                <div className="card-header">
                  <div className="student-avatar">{student.name.charAt(0).toUpperCase()}</div>
                  <div className="card-title">
                    <h3>{student.name}</h3>
                    <p className="card-department">{student.department}</p>
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-item">
                    <span className="info-label">📧 Email:</span>
                    <span className="info-value">{student.mail}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📱 Phone:</span>
                    <span className="info-value">{student.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📚 Course:</span>
                    <span className="info-value">{student.course}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <button 
                    className="btn-edit"
                    onClick={() => handleupdate(student.id)}
                    title="Edit student"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handledelete(student.id)}
                    title="Delete student"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewStudent