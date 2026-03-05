import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Preferences.css';

type PreferencesTab = 'user-settings' | 'preferences';

const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PreferencesTab>('user-settings');
  
  // Account Information
  const [accountNumber, setAccountNumber] = useState('');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [currentEmail, setCurrentEmail] = useState('john.doe@example.com');
  const [currentPassword] = useState('••••••••');
  
  // Dialog states
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  
  // Email dialog fields
  const [emailDialogCurrent, setEmailDialogCurrent] = useState('');
  const [emailDialogNew, setEmailDialogNew] = useState('');
  
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

  const handleBackToOverview = () => {
    navigate(-1);
  };

  const handleUpdateAccount = () => {
    showSuccessNotification('账户信息更新成功！');
  };

  const handleUpdatePreferences = () => {
    showSuccessNotification('偏好设置更新成功！');
  };

  const handleOpenEmailDialog = () => {
    setEmailDialogCurrent('');
    setEmailDialogNew('');
    setShowEmailDialog(true);
  };

  const handleOpenPasswordDialog = () => {
    setPasswordDialogCurrent('');
    setPasswordDialogNew('');
    setShowPasswordDialogCurrent(false);
    setShowPasswordDialogNew(false);
    setShowPasswordDialog(true);
  };

  const handleChangeEmail = () => {
    if (!emailDialogCurrent || !emailDialogNew) {
      alert('请填写所有字段');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailDialogCurrent) || !emailRegex.test(emailDialogNew)) {
      alert('请输入有效的邮箱地址');
      return;
    }
    setCurrentEmail(emailDialogNew);
    setShowEmailDialog(false);
    showSuccessNotification('邮箱更新成功！');
  };

  const handleChangePassword = () => {
    if (!passwordDialogCurrent || !passwordDialogNew) {
      alert('请填写所有字段');
      return;
    }
    if (passwordDialogNew.length < 8) {
      alert('新密码至少需要8个字符');
      return;
    }
    setShowPasswordDialog(false);
    showSuccessNotification('密码更新成功！');
  };

  const renderUserSettings = () => (
    <div className="preferences-content-compact">
      <div className="compact-layout-grid">
        {/* Left Column */}
        <div className="compact-column">
          <div className="preferences-section-compact">
            <h3>账户信息</h3>
            <div className="form-group">
              <label>账户编号</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="输入账户编号"
              />
            </div>
            <div className="form-group">
              <label>名字</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="输入名字"
              />
            </div>
            <div className="form-group">
              <label>姓氏</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="输入姓氏"
              />
            </div>
            <div className="form-group">
              <label>邮箱地址</label>
              <div className="readonly-field-wrapper">
                <input
                  type="text"
                  value={currentEmail}
                  readOnly
                  className="readonly-field"
                />
                <button
                  type="button"
                  className="edit-icon-btn"
                  onClick={handleOpenEmailDialog}
                  title="修改邮箱"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>密码</label>
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
                  title="修改密码"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <button className="update-btn-compact" onClick={handleUpdateAccount}>
              更新
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="compact-column">
          <div className="preferences-section-compact">
            <h3>配送偏好</h3>
            <div className="checkbox-group-compact">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={billingRefRequired}
                  onChange={(e) => setBillingRefRequired(e.target.checked)}
                />
                <span>需要账单参考号</span>
              </label>
            </div>

            <div className="form-group">
              <label>默认服务</label>
              <select
                value={defaultService}
                onChange={(e) => setDefaultService(e.target.value)}
              >
                <option value="Next Day">次日达</option>
                <option value="2nd Day">两日达</option>
                <option value="By 10:30am">上午10:30前</option>
                <option value="ECommerce">电商专递</option>
                <option value="By 8:30am">上午8:30前</option>
                <option value="By 3:00pm">下午3:00前</option>
              </select>
            </div>
            <div className="form-group">
              <label>打印至</label>
              <select
                value={printTo}
                onChange={(e) => setPrintTo(e.target.value)}
              >
                <option value="Plain Paper">普通纸张</option>
                <option value="4 x 5 in Label">4 x 5 英寸标签</option>
                <option value="4 x 6.5 in Label w/ Receipt">4 x 6.5 英寸标签（含收据）</option>
              </select>
            </div>
            <button className="update-btn-compact" onClick={handleUpdatePreferences}>
              更新
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="preferences-content">
      <div className="preferences-section">
        <h3>您的偏好</h3>
        <p className="placeholder-text">通用偏好设置即将推出...</p>
      </div>
    </div>
  );

  return (
    <div className="preferences-page">
      <div className="preferences-header">
        <div className="header-content">
          <h1>您的偏好设置</h1>
          <button className="back-to-overview-btn" onClick={handleBackToOverview}>
            <svg className="back-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回概览
          </button>
        </div>
      </div>

      <div className="preferences-tabs">
        <button
          className={`tab-btn ${activeTab === 'user-settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-settings')}
        >
          用户设置
        </button>
        <button
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          您的偏好
        </button>
      </div>

      <div className="preferences-body">
        {activeTab === 'user-settings' && renderUserSettings()}
        {activeTab === 'preferences' && renderPreferences()}
      </div>

      {/* Email Change Dialog */}
      {showEmailDialog && (
        <div className="dialog-overlay" onClick={() => setShowEmailDialog(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>修改邮箱地址</h3>
              <button className="dialog-close" onClick={() => setShowEmailDialog(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <div className="form-group">
                <label>当前邮箱地址</label>
                <input
                  type="email"
                  value={emailDialogCurrent}
                  onChange={(e) => setEmailDialogCurrent(e.target.value)}
                  placeholder="输入当前邮箱"
                />
              </div>
              <div className="form-group">
                <label>新邮箱地址</label>
                <input
                  type="email"
                  value={emailDialogNew}
                  onChange={(e) => setEmailDialogNew(e.target.value)}
                  placeholder="输入新邮箱"
                />
              </div>
            </div>
            <div className="dialog-footer">
              <button className="dialog-btn-cancel" onClick={() => setShowEmailDialog(false)}>
                取消
              </button>
              <button className="dialog-btn-confirm" onClick={handleChangeEmail}>
                修改邮箱
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Dialog */}
      {showPasswordDialog && (
        <div className="dialog-overlay" onClick={() => setShowPasswordDialog(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>修改密码</h3>
              <button className="dialog-close" onClick={() => setShowPasswordDialog(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <div className="form-group password-group">
                <label>当前密码</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordDialogCurrent ? 'text' : 'password'}
                    value={passwordDialogCurrent}
                    onChange={(e) => setPasswordDialogCurrent(e.target.value)}
                    placeholder="输入当前密码"
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
                <label>新密码</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordDialogNew ? 'text' : 'password'}
                    value={passwordDialogNew}
                    onChange={(e) => setPasswordDialogNew(e.target.value)}
                    placeholder="输入新密码（至少8个字符）"
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
                取消
              </button>
              <button className="dialog-btn-confirm" onClick={handleChangePassword}>
                修改密码
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
