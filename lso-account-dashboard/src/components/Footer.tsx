import React from 'react';
import './Footer.css';

const Footer: React.FC<{ showNewsletter?: boolean }> = ({ showNewsletter = true }) => {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="newsletter-section">
          <div className="newsletter-banner">
            <div className="newsletter-content-center">
              <span className="newsletter-label">NEWSLETTER</span>
              <h2 className="newsletter-title">
                <svg className="lso-icon-inline" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="26" cy="18" rx="21" ry="8" fill="#1E3A8A" transform="rotate(-22 26 18)"/>
                  <ellipse cx="30" cy="30" rx="24" ry="9" fill="#2563EB" transform="rotate(3 30 30)"/>
                  <circle cx="26" cy="44" r="9" fill="#0EA5E9"/>
                </svg>
                Get the latest updates from us
              </h2>
              <form className="newsletter-form-inline">
                <input type="email" placeholder="Enter your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Logo and Quick Links */}
          <div className="footer-column footer-brand">
            <div className="footer-logo">
              <svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="16" cy="13" rx="21" ry="8" fill="#1E3A8A" transform="rotate(-22 16 13)"/>
                <ellipse cx="20" cy="25" rx="24" ry="9" fill="#2563EB" transform="rotate(3 20 25)"/>
                <circle cx="16" cy="38" r="9" fill="#0EA5E9"/>
                <text x="40" y="32" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">LSO</text>
              </svg>
            </div>
            <div className="footer-quick-links">
              <a href="/account" className="footer-quick-link">
                <span className="icon">👤</span> My account
              </a>
              <a href="/ship" className="footer-quick-link">
                <span className="icon">📦</span> Ship with LSO
              </a>
            </div>
          </div>

          {/* Information Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Information</h4>
            <ul className="footer-list">
              <li><a href="/ship-package">Ship a package</a></li>
              <li><a href="/account">Create an LSO account</a></li>
              <li><a href="/pickup">Schedule an LSO pickup</a></li>
              <li><a href="/service-center">Service center locator</a></li>
              <li><a href="/supplies">Shipping supplies</a></li>
              <li><a href="/customer-service">Customer Service</a></li>
            </ul>
          </div>

          {/* Connect with us Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Connect with us</h4>
            <ul className="footer-list">
              <li><a href="/about">About us</a></li>
              <li><a href="/rates">LSO shipping rates</a></li>
              <li><a href="/contact">Contact Sales</a></li>
              <li><a href="/cookies">Cookie program</a></li>
              <li><a href="/holidays">Holidays</a></li>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/fuel">Fuel Surcharges</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column footer-contact">
            <h4 className="footer-heading">GOT A QUESTION?</h4>
            <button className="contact-btn">Contact us</button>
            
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">f</span> Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">📷</span> Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">in</span> LinkedIn
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">▶</span> Youtube
              </a>
            </div>

            <div className="contact-info">
              <p className="contact-address">
                <span className="icon">📍</span> 2800 E Plano Parkway, Suite 300,<br/>
                Plano, Texas, 75074
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p>© Copyright 2021 LSO Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/service-guide">Service Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
