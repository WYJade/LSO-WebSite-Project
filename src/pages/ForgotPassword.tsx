import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'request' | 'sent'>('request');
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('john.doe@example.com'); // Mock email

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber || !username) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate sending reset email
    setStep('sent');
  };

  const handleResendEmail = () => {
    alert('Reset email has been resent!');
  };

  return (
    <div className="forgot-password-page">
      {/* Header */}
      <div className="forgot-password-header">
        <div className="header-content">
          <div className="logo-section" onClick={() => navigate('/')}>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <ellipse cx="16" cy="10" rx="16" ry="8" fill="#1E3A8A" transform="rotate(-15 16 10)"/>
              <ellipse cx="20" cy="20" rx="18" ry="9" fill="#2563EB" transform="rotate(5 20 20)"/>
              <circle cx="16" cy="30" r="9" fill="#0EA5E9"/>
            </svg>
            <span className="logo-text">LSO</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="forgot-password-container">
        {step === 'request' && (
          <div className="forgot-password-card">
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#0EA5E9" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#0EA5E9" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1.5" fill="#0EA5E9"/>
              </svg>
            </div>
            
            <h1>Reset Password</h1>
            <p className="card-description">
              Enter your LSO Account Number and Username to receive a password reset link via email.
            </p>

            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label>LSO Account Number</label>
                <input
                  type="text"
                  placeholder="LSO Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Reset Password
              </button>

              <div className="form-footer">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="back-link">
                  ← Back to Login
                </a>
              </div>
            </form>
          </div>
        )}

        {step === 'sent' && (
          <div className="forgot-password-card success-card">
            <div className="card-icon success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2"/>
                <path d="M8 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1>Check Your Email</h1>
            <p className="card-description">
              Your reset password request has been sent to <strong>{email}</strong>
            </p>

            <div className="info-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#0EA5E9" strokeWidth="2"/>
                <path d="M12 16v-4m0-4h.01" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>
                Check your inbox and click on the link we've sent to reset your password. 
                The link will expire in <strong>24 hours</strong>.
              </p>
            </div>

            <div className="action-buttons">
              <button className="primary-btn" onClick={() => navigate('/')}>
                Back to Home
              </button>
              <button className="secondary-btn" onClick={handleResendEmail}>
                Resend Email
              </button>
            </div>

            <div className="help-text">
              Didn't receive the email? Check your spam folder or{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); handleResendEmail(); }}>
                resend the link
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
