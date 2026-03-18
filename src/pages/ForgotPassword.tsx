import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

type Step = 'email' | 'verify' | 'newPassword' | 'success';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');

  // Step 1: Email
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Step 2: Verification Code
  const [code, setCode] = useState('');
  const [codeTouched, setCodeTouched] = useState(false);
  const [codeError, setCodeError] = useState('');

  // Step 3: New Password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwTouched, setPwTouched] = useState(false);
  const [cpTouched, setCpTouched] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showCp, setShowCp] = useState(false);
  const [pwSubmitAttempted, setPwSubmitAttempted] = useState(false);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const mockValidEmails = ['john.doe@example.com', 'jane.smith@example.com', 'bob.johnson@example.com'];

  // Step 1 handlers
  const getEmailError = (): string => {
    if (!email.trim()) return 'Email address is required.';
    if (!validateEmail(email)) return 'Please enter a valid email address.';
    return '';
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    const err = getEmailError();
    if (err) { setEmailError(err); return; }
    // Mock: check if email exists
    if (!mockValidEmails.includes(email.toLowerCase())) {
      setEmailError('This email address is not associated with any account. Please check and try again.');
      return;
    }
    setEmailError('');
    setEmailSent(true);
    setStep('verify');
  };

  // Step 2 handlers
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeTouched(true);
    if (!code.trim()) { setCodeError('Verification code is required.'); return; }
    if (code.length < 6) { setCodeError('Please enter a valid 6-digit verification code.'); return; }
    // Mock: "123456" is valid
    if (code !== '123456') {
      setCodeError('Invalid verification code. Please check your email and try again.');
      return;
    }
    setCodeError('');
    setStep('newPassword');
  };

  // Step 3 handlers
  const pwRules = [
    { label: 'lowercase', test: (v: string) => /[a-z]/.test(v) },
    { label: 'uppercase', test: (v: string) => /[A-Z]/.test(v) },
    { label: 'number', test: (v: string) => /[0-9]/.test(v) },
    { label: 'special char', test: (v: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v) },
    { label: '8+ chars', test: (v: string) => v.length >= 8 },
  ];
  const isPwValid = (v: string) => pwRules.every(r => r.test(v));

  const [changingPw, setChangingPw] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwSubmitAttempted(true);
    setPwTouched(true);
    setCpTouched(true);
    if (!password) return;
    if (!isPwValid(password)) return;
    if (!confirmPassword) return;
    if (password !== confirmPassword) return;
    // Show brief loading then success
    setChangingPw(true);
    setTimeout(() => {
      setChangingPw(false);
      setStep('success');
    }, 1200);
  };

  const titleIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#0c5c8f" strokeWidth="2"/>
      <path d="M2 8l10 5 10-5" stroke="#0c5c8f" strokeWidth="2"/>
      <path d="M2 12l10 5 10-5" stroke="#0c5c8f" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );

  return (
    <div className="forgot-password-page">
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

      <div className="forgot-password-container">

        {/* Step 1: Email */}
        {step === 'email' && (
          <div className="forgot-password-card">
            <div className="card-title-row">{titleIcon}<h1>Reset Password</h1></div>
            <p className="card-description">
              Enter your email address to receive a verification code.
            </p>
            <form onSubmit={handleEmailSubmit} className="forgot-password-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (emailTouched) setEmailError(''); }}
                  onBlur={() => { setEmailTouched(true); setEmailError(getEmailError()); }}
                  className={emailTouched && emailError ? 'input-error' : ''}
                />
                {emailTouched && emailError && <span className="field-error">{emailError}</span>}
              </div>
              <button type="submit" className="submit-btn">Send Verification Code</button>
              <div className="form-footer">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="back-link">← Back to Login</a>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Verification Code */}
        {step === 'verify' && (
          <div className="forgot-password-card">
            <div className="card-title-row">{titleIcon}<h1>Verify Your Identity</h1></div>
            <div className="submitted-banner">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#0c5c8f" strokeWidth="2"/>
                <path d="M2 8l10 5 10-5" stroke="#0c5c8f" strokeWidth="2"/>
                <path d="M8 13l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p>A verification code has been sent to <a href={`mailto:${email}`}>{email}</a>.</p>
                <p className="banner-sub">Please check your inbox and enter the code below.</p>
              </div>
            </div>
            <form onSubmit={handleVerifySubmit} className="forgot-password-form">
              <div className="form-group">
                <label>Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit verification code"
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); if (codeTouched) setCodeError(''); }}
                  onBlur={() => setCodeTouched(true)}
                  className={codeTouched && codeError ? 'input-error' : ''}
                  maxLength={6}
                />
                {codeTouched && codeError && <span className="field-error">{codeError}</span>}
              </div>
              <button type="submit" className="submit-btn">Verify Code</button>
              <div className="form-footer">
                <span className="resend-text">
                  Didn't receive the code?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Verification code has been resent!'); }}>Resend Code</a>
                </span>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 'newPassword' && (
          <div className="forgot-password-card">
            <div className="card-title-row">{titleIcon}<h1>Choose a new password</h1></div>
            <form onSubmit={handlePasswordSubmit} className="forgot-password-form">
              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPwTouched(true)}
                    className={(pwTouched || pwSubmitAttempted) && (!password || !isPwValid(password)) ? 'input-error' : ''}
                  />
                  <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)} aria-label="Toggle password visibility">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      {showPw ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M1 1l22 22" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {(pwTouched || pwSubmitAttempted) && !password && <span className="field-error">Password is required.</span>}
              </div>

              {/* Password rules */}
              {(password || pwTouched || pwSubmitAttempted) && (
                <div className="pw-rules">
                  <p className="pw-rules-title">Password must contain:</p>
                  <div className="pw-rules-list">
                    {pwRules.map((rule) => (
                      <span key={rule.label} className={`pw-rule ${password && rule.test(password) ? 'met' : 'unmet'}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          {password && rule.test(password) ? (
                            <path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          ) : (
                            <circle cx="12" cy="12" r="5" fill="#cbd5e1"/>
                          )}
                        </svg>
                        {rule.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showCp ? 'text' : 'password'}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setCpTouched(true)}
                    className={(cpTouched || pwSubmitAttempted) && confirmPassword && confirmPassword !== password ? 'input-error' : ''}
                  />
                  <button type="button" className="toggle-pw" onClick={() => setShowCp(!showCp)} aria-label="Toggle password visibility">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      {showCp ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M1 1l22 22" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {(cpTouched || pwSubmitAttempted) && confirmPassword && confirmPassword !== password && (
                  <span className="field-error">Passwords do not match. Please try again.</span>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={changingPw}>
                {changingPw ? (
                  <span className="btn-loading">
                    <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 019.95 9" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Updating password...
                  </span>
                ) : 'Change Password'}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="forgot-password-card success-card">
            <div className="card-title-row">{titleIcon}<h1>Password updated!</h1></div>
            <div className="success-lock-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#0c5c8f" strokeWidth="1.5"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#0c5c8f" strokeWidth="1.5"/>
                <path d="M10 16l1.5 1.5L15 14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="success-message">Congratulations! Now you can login with your new password.</p>
            <button className="home-link-btn" onClick={() => navigate('/')}>
              Take me back to the homepage →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
