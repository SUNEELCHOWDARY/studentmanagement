import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/global.css'

const UpdateStudent = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      axios.get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        const student = response.data;
        setName(student.name);
        setMail(student.mail);
        setPhone(student.phone);
        setDepartment(student.department);
        setCourse(student.course);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setError('Failed to load student data');
        setLoading(false);
      });
    }, [id]);

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      setSaving(true);

      const data = {
        name: name.trim(),
        mail: mail.trim(),
        phone: phone.trim(),
        department: department.trim(),
        course: course.trim()
      };

      axios.put(`http://localhost:5000/users/${id}`, data)
      .then(() => {
        setSaving(false);
        navigate('/view');
      })
      .catch((err) => {
        console.error('Error updating student:', err);
        setError('Failed to update student');
        setSaving(false);
      });
    }

    return (
      <div className="update-container">
        <div className="animated-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="update-section">
          <div className="update-header">
            <h1 className="update-title">✏️ Update Student</h1>
            <p className="update-subtitle">Edit and save student information</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading student data...</p>
            </div>
          ) : (
            <div className="form-container">
              <form onSubmit={handleSubmit} className="student-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text"
                    placeholder='Enter full name' 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email"
                    placeholder='Enter email address' 
                    required
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel"
                    placeholder='Enter phone number' 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <input 
                    type="text"
                    placeholder='Enter department' 
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course *</label>
                  <input 
                    type="text"
                    placeholder='Enter course name' 
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type='submit'
                    className="btn-submit"
                    disabled={saving}
                  >
                    {saving ? 'Updating...' : '✅ Update Student'}
                  </button>
                  <button 
                    type='button'
                    className="btn-cancel"
                    onClick={() => navigate('/view')}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>

              <div className="form-info">
                <h3>📌 Important Information</h3>
                <ul>
                  <li>All fields are required</li>
                  <li>Email should be a valid email address</li>
                  <li>Changes will be saved immediately</li>
                  <li>You will be redirected to the student list after updating</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )
}

export default UpdateStudent
