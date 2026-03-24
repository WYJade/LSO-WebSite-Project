import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'ship' | 'calculate' | 'pricing' | 'tracking'>('tracking');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAuthModal(false);
      }
    };

    if (showAuthModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthModal]);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate(`/dashboard/tracking?q=${encodeURIComponent(trackingNumber)}`);
    }
  };

  const handleTabAction = (tab: string) => {
    switch(tab) {
      case 'ship':
        navigate('/dashboard/ship-with-account');
        break;
      case 'calculate':
        navigate('/dashboard/calculate-rates');
        break;
      case 'pricing':
        navigate('/dashboard/calculate-rates');
        break;
      case 'tracking':
        // Stay on current tab
        break;
    }
  };

  return (
    <div className="home-page">
      {/* Top Navigation Bar */}
      <div className="home-top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-badge">Ship With LSO Now</span>
          </div>
          <div className="top-bar-right">
            <a href="#" className="top-link">
              <span className="icon-alert">⚠</span> Alerts
            </a>
            <a href="#" className="top-link">Sales</a>
            <a href="#" className="top-link">Customer Service</a>
            <a href="#" className="top-link">
              <span className="icon-location">📍</span> Locations ▼
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section" onClick={() => navigate('/')}>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <ellipse cx="16" cy="10" rx="16" ry="8" fill="#1E3A8A" transform="rotate(-15 16 10)"/>
              <ellipse cx="20" cy="20" rx="18" ry="9" fill="#2563EB" transform="rotate(5 20 20)"/>
              <circle cx="16" cy="30" r="9" fill="#0EA5E9"/>
            </svg>
            <span className="logo-text">LSO</span>
          </div>
          
          <nav className="main-nav">
            <div className="nav-item">Shipping ▼</div>
            <div className="nav-item">Services ▼</div>
            <div className="nav-item" onClick={() => navigate('/tracking')}>Tracking</div>
            <div className="nav-item">About Us ▼</div>
          </nav>

          <div className="header-actions">
            <div className="search-box">
              <input type="text" placeholder="Track a package" className="search-input" />
              <button className="search-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            <div className="login-dropdown-container" ref={dropdownRef}>
              <button className="login-btn" onClick={() => setShowAuthModal(!showAuthModal)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                LOGIN / SIGN UP ▼
              </button>

              {/* Auth Dropdown */}
              {showAuthModal && (
                <div className="auth-dropdown">
                  <div className="auth-tabs">
                    <button 
                      className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                      onClick={() => setAuthMode('login')}
                    >
                      Login
                    </button>
                    <button 
                      className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                      onClick={() => navigate('/signup')}
                    >
                      Sign up →
                    </button>
                  </div>

                  {authMode === 'login' && (
                    <div className="auth-form">
                      <div className="auth-form-group">
                        <div className="auth-input-wrapper">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="input-icon">
                            <circle cx="12" cy="12" r="3" stroke="#999" strokeWidth="2"/>
                            <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="#999" strokeWidth="2"/>
                          </svg>
                          <input type="text" placeholder="Username" className="auth-input" />
                        </div>
                      </div>

                      <div className="auth-form-group">
                        <div className="auth-input-wrapper">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="input-icon">
                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#999" strokeWidth="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#999" strokeWidth="2"/>
                          </svg>
                          <input type="password" placeholder="Password" className="auth-input" />
                          <button className="password-toggle-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#999" strokeWidth="2"/>
                              <circle cx="12" cy="12" r="3" stroke="#999" strokeWidth="2"/>
                            </svg>
                          </button>
                        </div>
                        <p className="password-hint">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2"/>
                            <path d="M12 16v-4m0-4h.01" stroke="#666" strokeWidth="2"/>
                          </svg>
                          Password is case-sensitive.
                        </p>
                      </div>

                      <div className="auth-form-footer">
                        <label className="remember-me">
                          <input type="checkbox" />
                          <span>Remember me</span>
                        </label>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} className="forgot-password">
                          Forgot Password
                        </a>
                      </div>

                      <button className="auth-submit-btn" onClick={() => navigate('/dashboard/overview')}>
                        Sign in
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#0EA5E9"/>
              </svg>
              <span>It's All In The Delivery</span>
            </div>
            <h1 className="hero-title">Leading Overnight Delivery &<br/>Shipping Company</h1>
          </div>

          {/* Action Tabs and Card */}
          <div className="action-tabs-container">
            <div className="action-tabs">
              <button 
                className={`action-tab ${activeTab === 'ship' ? 'active' : ''}`}
                onClick={() => { setActiveTab('ship'); handleTabAction('ship'); }}
              >
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="12" width="28" height="20" stroke="currentColor" strokeWidth="2"/>
                  <path d="M32 20h8l4 4v8h-4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Ship now</span>
              </button>

              <button 
                className={`action-tab ${activeTab === 'calculate' ? 'active' : ''}`}
                onClick={() => { setActiveTab('calculate'); handleTabAction('calculate'); }}
              >
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L38 12v16L24 36L10 28V12L24 4z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Calculate rates</span>
              </button>

              <button 
                className={`action-tab ${activeTab === 'pricing' ? 'active' : ''}`}
                onClick={() => { setActiveTab('pricing'); handleTabAction('pricing'); }}
              >
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L38 12v16L24 36L10 28V12L24 4z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Pricing</span>
              </button>

              <button 
                className={`action-tab ${activeTab === 'tracking' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracking')}
              >
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2"/>
                  <path d="M38 38l-8-8" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Tracking</span>
              </button>
            </div>

            {/* Tracking Card */}
            {activeTab === 'tracking' && (
              <div className="tracking-card">
                <div className="tracking-card-content">
                  <h3 className="tracking-card-title">Track your package</h3>
                  <div className="tracking-input-row">
                    <input
                      type="text"
                      className="tracking-input"
                      placeholder="Enter tracking number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    />
                    <button className="track-btn" onClick={handleTrack}>
                      Track
                    </button>
                  </div>
                  <a href="#" className="track-multiple-link">Track multiple packages</a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll Arrow */}
        <button className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </section>
    </div>
  );
};

export default Home;
