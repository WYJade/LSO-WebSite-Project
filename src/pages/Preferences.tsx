import React, { useState } from 'react';
import './Preferences.css';

const Preferences: React.FC = () => {
  
  // Account Information
  const [accountNumber] = useState('ACC-001234'); // Read-only default value
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [currentPassword] = useState('••••••••');
  
  // Dialog states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  
  // Password dialog fields
  const [passwordDialogCurrent, setPasswordDialogCurrent] = useState('');
  const [passwordDialogNew, setPasswordDialogNew] = useState('');
  const [showPasswordDialogCurrent, setShowPasswordDialogCurrent] = useState(false);
  const [showPasswordDialogNew, setShowPasswordDialogNew] = useState(false);
  
  // Preferences
  const [billingRefRequired, setBillingRefRequired] = useState(false);
  const [defaultService, setDefaultService] = useState('Next Day');
  const [printTo, setPrintTo] = useState('Plain Paper');
  
  // Toast
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccessNotification = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handleUpdateAccount = () => {
    showSuccessNotification('Account information updated successfully!');
  };

  const handleUpdatePreferences = () => {
    showSuccessNotification('Preferences updated successfully!');
  };

  const handleOpenPasswordDialog = () => {
    setPasswordDialogCurrent('');
    setPasswordDialogNew('');
    setShowPasswordDialogCurrent(false);
    setShowPasswordDialogNew(false);
    setShowPasswordDialog(true);
  };

  const handleChangePassword = () => {
    if (!passwordDialogCurrent || !passwordDialogNew) {
      alert('Please fill in all fields');
      return;
    }
    if (passwordDialogNew.length < 8) {
      alert('New password must be at least 8 characters');
      return;
    }
    setShowPasswordDialog(false);
    showSuccessNotification('Password updated successfully!');
  };

  const renderUserSettings = () => (
    <div className="preferences-content-compact">
      <div className="compact-layout-grid">
        {/* Left Column */}
        <div className="compact-column">
          <div className="preferences-section-compact">
            <h3>Account Information</h3>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                value={accountNumber}
                readOnly
                className="readonly-field"
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="readonly-field-wrapper">
                <input
                  type="password"
                  value={currentPassword}
                  readOnly
                  className="readonly-field"
                />
                <button
                  type="button"
                  className="edit-icon-btn"
                  onClick={handleOpenPasswordDialog}
                  title="Change Password"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <button className="update-btn-compact" onClick={handleUpdateAccount}>
              Update
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="compact-column">
          <div className="preferences-section-compact">
            <h3>Shipping Preferences</h3>
            <div className="checkbox-group-compact">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={billingRefRequired}
                  onChange={(e) => setBillingRefRequired(e.target.checked)}
                />
                <span>Billing Reference Required</span>
              </label>
            </div>

            <div className="form-group">
              <label>Default Service</label>
              <select
                value={defaultService}
                onChange={(e) => setDefaultService(e.target.value)}
              >
                <option value="Next Day">Next Day</option>
                <option value="2nd Day">2nd Day</option>
                <option value="By 10:30am">By 10:30am</option>
                <option value="ECommerce">ECommerce</option>
                <option value="By 8:30am">By 8:30am</option>
                <option value="By 3:00pm">By 3:00pm</option>
              </select>
            </div>
            <div className="form-group">
              <label>Print to</label>
              <select
                value={printTo}
                onChange={(e) => setPrintTo(e.target.value)}
              >
                <option value="Plain Paper">Plain Paper</option>
                <option value="4 x 5 in Label">4 x 5 in Label</option>
                <option value="4 x 6.5 in Label w/ Receipt">4 x 6.5 in Label w/ Receipt</option>
              </select>
            </div>
            <button className="update-btn-compact" onClick={handleUpdatePreferences}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="preferences-content">
      <div className="preferences-section">
        <h3>My Profile</h3>
        <p className="placeholder-text">General preference settings coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="preferences-page">
      <div className="preferences-header">
        <div className="header-content">
          <h1>My Profile</h1>
        </div>
      </div>

      <div className="preferences-body">
        {renderUserSettings()}
      </div>

      {/* Password Change Dialog */}
      {showPasswordDialog && (
        <div className="dialog-overlay" onClick={() => setShowPasswordDialog(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Change Password</h3>
              <button className="dialog-close" onClick={() => setShowPasswordDialog(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <div className="form-group password-group">
                <label>Current Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordDialogCurrent ? 'text' : 'password'}
                    value={passwordDialogCurrent}
                    onChange={(e) => setPasswordDialogCurrent(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPasswordDialogCurrent(!showPasswordDialogCurrent)}
                  >
                    {showPasswordDialogCurrent ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="form-group password-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordDialogNew ? 'text' : 'password'}
                    value={passwordDialogNew}
                    onChange={(e) => setPasswordDialogNew(e.target.value)}
                    placeholder="Enter new password (at least 8 characters)"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPasswordDialogNew(!showPasswordDialogNew)}
                  >
                    {showPasswordDialogNew ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="dialog-btn-cancel" onClick={() => setShowPasswordDialog(false)}>
                Cancel
              </button>
              <button className="dialog-btn-confirm" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="success-toast">
          <div className="toast-content">
            <svg className="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="toast-message">{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
