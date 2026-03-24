import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const MAX_ATTEMPTS_BEFORE_CAPTCHA = 3;
const MAX_ATTEMPTS_TOTAL = 6;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'ship' | 'calculate' | 'pricing' | 'tracking'>('tracking');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Slider captcha state
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  // Lockout countdown timer
  useEffect(() => {
    if (!isLockedOut || !lockoutEndTime) return;
    const interval = setInterval(() => {
      const remaining = lockoutEndTime - Date.now();
      if (remaining <= 0) {
        setIsLockedOut(false);
        setLockoutEndTime(null);
        setLockoutRemaining('');
        setFailedAttempts(0);
        setCaptchaVerified(false);
        setShowCaptcha(false);
        setCaptchaStatus('idle');
        setSliderPos(0);
        setLoginError('');
      } else {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setLockoutRemaining(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isLockedOut, lockoutEndTime]);

  // Slider captcha drag handlers
  const handleSliderMouseDown = (e: React.MouseEvent) => {
    if (captchaStatus === 'success') return;
    setIsDragging(true);
    setCaptchaStatus('idle');
  };

  const handleSliderMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderTrackRef.current) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const maxX = rect.width - 44;
    let x = e.clientX - rect.left - 22;
    x = Math.max(0, Math.min(x, maxX));
    setSliderPos(x);
  }, [isDragging]);

  const handleSliderMouseUp = useCallback(() => {
    if (!isDragging || !sliderTrackRef.current) return;
    setIsDragging(false);
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const maxX = rect.width - 44;
    const threshold = maxX * 0.85;
    if (sliderPos >= threshold) {
      setSliderPos(maxX);
      setCaptchaStatus('success');
      setCaptchaVerified(true);
    } else {
      setCaptchaStatus('fail');
      setTimeout(() => { setSliderPos(0); setCaptchaStatus('idle'); }, 500);
    }
  }, [isDragging, sliderPos]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleSliderMouseMove);
      window.addEventListener('mouseup', handleSliderMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleSliderMouseMove);
      window.removeEventListener('mouseup', handleSliderMouseUp);
    };
  }, [isDragging, handleSliderMouseMove, handleSliderMouseUp]);

  // Touch support for slider
  const handleSliderTouchStart = () => {
    if (captchaStatus === 'success') return;
    setIsDragging(true);
    setCaptchaStatus('idle');
  };

  const handleSliderTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !sliderTrackRef.current) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const maxX = rect.width - 44;
    let x = e.touches[0].clientX - rect.left - 22;
    x = Math.max(0, Math.min(x, maxX));
    setSliderPos(x);
  }, [isDragging]);

  const handleSliderTouchEnd = useCallback(() => {
    if (!isDragging || !sliderTrackRef.current) return;
    setIsDragging(false);
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const maxX = rect.width - 44;
    const threshold = maxX * 0.85;
    if (sliderPos >= threshold) {
      setSliderPos(maxX);
      setCaptchaStatus('success');
      setCaptchaVerified(true);
    } else {
      setCaptchaStatus('fail');
      setTimeout(() => { setSliderPos(0); setCaptchaStatus('idle'); }, 500);
    }
  }, [isDragging, sliderPos]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleSliderTouchMove);
      window.addEventListener('touchend', handleSliderTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', handleSliderTouchMove);
      window.removeEventListener('touchend', handleSliderTouchEnd);
    };
  }, [isDragging, handleSliderTouchMove, handleSliderTouchEnd]);

  const handleLogin = () => {
    setLoginError('');

    if (isLockedOut) return;

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both username and password.');
      return;
    }

    // Show captcha requirement after 3 failed attempts
    if (failedAttempts >= MAX_ATTEMPTS_BEFORE_CAPTCHA && !captchaVerified) {
      setLoginError('Please complete the verification below before signing in.');
      setShowCaptcha(true);
      return;
    }

    // Simulate login validation (demo: username=admin, password=admin123)
    const isValid = loginUsername === 'admin' && loginPassword === 'admin123';

    if (isValid) {
      setFailedAttempts(0);
      setCaptchaVerified(false);
      setShowCaptcha(false);
      navigate('/dashboard/overview');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setCaptchaVerified(false);
      setCaptchaStatus('idle');
      setSliderPos(0);

      if (newAttempts >= MAX_ATTEMPTS_TOTAL) {
        setIsLockedOut(true);
        setLockoutEndTime(Date.now() + LOCKOUT_DURATION);
        setLoginError('You have exceeded the maximum number of failed login attempts. Please try again in 5 minutes.');
        setShowCaptcha(false);
      } else if (newAttempts >= MAX_ATTEMPTS_BEFORE_CAPTCHA) {
        setLoginError(`Invalid username or password. (${MAX_ATTEMPTS_TOTAL - newAttempts} attempts remaining)`);
        setShowCaptcha(true);
      } else {
        setLoginError(`Invalid username or password. (${MAX_ATTEMPTS_BEFORE_CAPTCHA - newAttempts} attempts before verification required)`);
      }
    }
  };

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
                      {isLockedOut && (
                        <div className="login-lockout-banner">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/>
                            <path d="M12 8v4m0 4h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <div>
                            <p className="lockout-text">You have exceeded the maximum number of failed login attempts. Please try again in 5 minutes.</p>
                            {lockoutRemaining && <p className="lockout-timer">Time remaining: {lockoutRemaining}</p>}
                          </div>
                        </div>
                      )}

                      {loginError && !isLockedOut && (
                        <div className="login-error-banner">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/>
                            <path d="M12 8v4m0 4h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span>{loginError}</span>
                        </div>
                      )}

                      <div className="auth-form-group">
                        <div className={`auth-input-wrapper ${isLockedOut ? 'input-disabled' : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="input-icon">
                            <circle cx="12" cy="12" r="3" stroke="#999" strokeWidth="2"/>
                            <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="#999" strokeWidth="2"/>
                          </svg>
                          <input
                            type="text"
                            placeholder="Username"
                            className="auth-input"
                            value={loginUsername}
                            onChange={(e) => { setLoginUsername(e.target.value); setLoginError(''); }}
                            disabled={isLockedOut}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                          />
                        </div>
                      </div>

                      <div className="auth-form-group">
                        <div className={`auth-input-wrapper ${isLockedOut ? 'input-disabled' : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="input-icon">
                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#999" strokeWidth="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#999" strokeWidth="2"/>
                          </svg>
                          <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            value={loginPassword}
                            onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                            disabled={isLockedOut}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                          />
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

                      {/* Slider Captcha */}
                      {showCaptcha && !isLockedOut && (
                        <div className="slider-captcha-container">
                          <div className="slider-captcha-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0EA5E9" strokeWidth="2"/>
                            </svg>
                            <span>Drag the slider to verify you are human</span>
                          </div>
                          <div
                            className={`slider-captcha-track ${captchaStatus === 'success' ? 'captcha-success' : ''} ${captchaStatus === 'fail' ? 'captcha-fail' : ''}`}
                            ref={sliderTrackRef}
                          >
                            <div className="slider-captcha-fill" style={{ width: sliderPos + 22 }}></div>
                            <div className="slider-captcha-text">
                              {captchaStatus === 'success' ? '✓ Verified' : captchaStatus === 'fail' ? 'Try again' : 'Slide to verify →'}
                            </div>
                            <div
                              className={`slider-captcha-thumb ${isDragging ? 'dragging' : ''}`}
                              style={{ left: sliderPos }}
                              onMouseDown={handleSliderMouseDown}
                              onTouchStart={handleSliderTouchStart}
                            >
                              {captchaStatus === 'success' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#0d3b66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 18l6-6-6-6" stroke="#0d3b66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="auth-form-footer">
                        <label className="remember-me">
                          <input type="checkbox" />
                          <span>Remember me</span>
                        </label>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} className="forgot-password">
                          Forgot Password
                        </a>
                      </div>

                      <button
                        className={`auth-submit-btn ${isLockedOut ? 'btn-disabled' : ''}`}
                        onClick={handleLogin}
                        disabled={isLockedOut}
                      >
                        {isLockedOut ? 'Account Locked' : 'Sign in'}
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
