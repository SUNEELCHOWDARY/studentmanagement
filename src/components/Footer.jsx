import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer footer-compact">
      <div className="footer-container">
        <div className="footer-content compact">
          <div className="footer-section compact-left">
            <p className="footer-small">© {year} Student Management</p>
          </div>
          <div className="footer-section compact-right">
            <nav className="footer-links-compact">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
