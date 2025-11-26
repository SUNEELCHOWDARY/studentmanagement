import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/global.css'

const Home = () => {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const courses = [
    {
      title: 'Python Full Stack',
      subtitle: 'Backend + Frontend with Django / React',
      tag: 'Python',
      duration: '12 weeks',
      level: 'Intermediate',
      price: 'Free',
      bullets: ['Django REST APIs', 'React front-end', 'Deployment & CI/CD']
    },
    {
      title: 'Java Full Stack',
      subtitle: 'Enterprise Web with Spring Boot & React',
      tag: 'Java',
      duration: '14 weeks',
      level: 'Intermediate',
      price: 'Free',
      bullets: ['Spring Boot APIs', 'Thymeleaf + React options', 'Database & Security']
    },
    {
      title: 'Cloud Computing',
      subtitle: 'AWS / Azure / GCP fundamentals & services',
      tag: 'Cloud',
      duration: '8 weeks',
      level: 'Beginner',
      price: 'Free',
      bullets: ['Core cloud services', 'IaC & DevOps basics', 'Serverless patterns']
    },
    {
      title: 'MERN Stack',
      subtitle: 'Mongo / Express / React / Node',
      tag: 'MERN',
      duration: '10 weeks',
      level: 'Intermediate',
      price: 'Free',
      bullets: ['MongoDB schema design', 'REST API with Express', 'React SPA + Hooks']
    }
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        setStudentCount(response.data.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching student count:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-gradient">Student Management</span>
              <span className="title-break">System</span>
            </h1>
            <p className="hero-subtitle">
              Streamline your educational institution with our comprehensive student management platform
            </p>
            <p className="hero-description">
              Manage, track, and organize student information effortlessly with our intuitive and powerful system designed for modern educational needs.
            </p>
          </div>

          <div className="live-stats">
            <div className="stat-box">
              <div className="stat-number">{loading ? '...' : studentCount}</div>
              <div className="stat-label">Active Students</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">100%</div>
              <div className="stat-label">Secure</div>
            </div>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card feature-card-1">
            <div className="feature-header">
              <div className="feature-icon">📋</div>
              <h3>View Students</h3>
            </div>
            <p>Browse all registered students with detailed information and records</p>
            <div className="feature-meta">
              <span className="badge">Management</span>
            </div>
            <button className="feature-btn" onClick={() => navigate('/view')}>
              View Now →
            </button>
          </div>

          <div className="feature-card feature-card-2">
            <div className="feature-header">
              <div className="feature-icon">➕</div>
              <h3>Add Student</h3>
            </div>
            <p>Quickly register new students with comprehensive form validation</p>
            <div className="feature-meta">
              <span className="badge">Registration</span>
            </div>
            <button className="feature-btn" onClick={() => navigate('/add')}>
              Add Now →
            </button>
          </div>

          <div className="feature-card feature-card-3">
            <div className="feature-header">
              <div className="feature-icon">✏️</div>
              <h3>Update Records</h3>
            </div>
            <p>Modify and update student information with instant database sync</p>
            <div className="feature-meta">
              <span className="badge">Maintenance</span>
            </div>
            <button className="feature-btn" onClick={() => navigate('/view')}>
              Manage →
            </button>
          </div>

          <div className="feature-card feature-card-4">
            <div className="feature-header">
              <div className="feature-icon">🗑️</div>
              <h3>Delete Records</h3>
            </div>
            <p>Remove student records with confirmation for data integrity</p>
            <div className="feature-meta">
              <span className="badge">Administration</span>
            </div>
            <button className="feature-btn" onClick={() => navigate('/view')}>
              Manage →
            </button>
          </div>
        </div>

        <div className="courses-section">
          <h2 className="section-title">Our Courses</h2>
          <div className="courses-grid">
            {courses.map((c, idx) => (
              <div className="course-card" key={idx}>
                <div className="course-header">
                  <div>
                    <h3 className="course-title">{c.title}</h3>
                    <div className="course-meta">{c.duration} • {c.level}</div>
                  </div>
                  <div className="course-right">
                    <span className="course-badge">{c.tag}</span>
                    <div className="course-price">{c.price}</div>
                  </div>
                </div>
                <p className="course-sub">{c.subtitle}</p>
                <ul className="course-bullets">
                  {c.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="course-actions">
                  <button className="course-btn" onClick={() => navigate('/view')}>Explore</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Removed: Why Choose, CTA, and Key Features sections as requested */}
      </div>
    </div>
  )
}

export default Home
