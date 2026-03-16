import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [step, setStep] = useState<'reset' | 'success'>('reset');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return '#ef4444';
    if (passwordStrength <= 3) return '#f59e0b';
    if (passwordStrength <= 4) return '#10b981';
    return '#059669';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Simulate password reset
    setStep('success');
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div className="reset-password-page">
      {/* Header */}
      <div className="reset-password-header">
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
      <div className="reset-password-container">
        {step === 'reset' && (
          <div className="reset-password-card">
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a5 5 0 015 5v3h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h1V7a5 5 0 015-5z" stroke="#0EA5E9" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="16" r="2" fill="#0EA5E9"/>
                <path d="M12 18v2" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h1>Create New Password</h1>
            <p className="card-description">
              Your new password must be different from previously used passwords and meet our security requirements.
            </p>

            <form onSubmit={handleSubmit} className="reset-password-form">
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
                
                {newPassword && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`strength-bar ${level <= passwordStrength ? 'active' : ''}`}
                          style={{
                            backgroundColor: level <= passwordStrength ? getStrengthColor() : '#e2e8f0'
                          }}
                        />
                      ))}
                    </div>
                    <span className="strength-label" style={{ color: getStrengthColor() }}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                )}
              </div>

              <div className="password-requirements">
                <p className="requirements-title">Password must contain:</p>
                <ul>
                  <li className={newPassword.length >= 8 ? 'met' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'met' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Upper & lowercase letters
                  </li>
                  <li className={/\d/.test(newPassword) ? 'met' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    At least one number
                  </li>
                  <li className={/[^a-zA-Z0-9]/.test(newPassword) ? 'met' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    At least one special character
                  </li>
                </ul>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="error-message">Passwords do not match</p>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Reset Password
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="reset-password-card success-card">
            <div className="card-icon success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#10B981"/>
                <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1>Password Reset Successful!</h1>
            <p className="card-description">
              Your password has been successfully reset. You can now log in with your new password.
            </p>

            <div className="success-features">
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Password updated securely</span>
              </div>
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#10B981" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="#10B981" strokeWidth="2"/>
                </svg>
                <span>Account security enhanced</span>
              </div>
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Ready to access your account</span>
              </div>
            </div>

            <button className="primary-btn" onClick={handleGoToLogin}>
              Go to Login
            </button>

            <div className="help-text">
              Need help? <a href="#">Contact Support</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
