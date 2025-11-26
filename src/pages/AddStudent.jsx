import axios from 'axios'; 
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'

const AddStudent = () => {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleForm = (e) => { 
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = {
            name: name.trim(),
            mail: mail.trim(),
            phone: phone.trim(),
            department: department.trim(),
            course: course.trim()
        }

        axios.post('http://localhost:5000/users', data)
        .then(() => {
          setName('');
          setMail('');
          setPhone(''); 
          setDepartment('');
          setCourse('');
          setLoading(false);
          navigate("/view");
        })    
        .catch((err) => {
          console.error('Error adding student:', err);
          setError('Failed to add student. Please try again.');
          setLoading(false);
        })
    }

    return (
      <div className="add-container">
        <div className="animated-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="add-section">
          <div className="form-header">
            <h1 className="form-title">➕ Add New Student</h1>
            <p className="form-subtitle">Register a new student in the system</p>
          </div>

          <div className="form-container">
            <form onSubmit={handleForm} className="student-form">
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
                  disabled={loading}
                >
                  {loading ? 'Adding...' : '✅ Add Student'}
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
                <li>Phone number should be valid</li>
                <li>Department and course fields are text-based</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AddStudent