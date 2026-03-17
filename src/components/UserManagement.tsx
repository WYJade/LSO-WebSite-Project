import React, { useState } from 'react';
import { UserManagementProps } from '../types/components';
import { NewUserData, UserRole, UserStatus, AccountUser } from '../types/models';
import './UserManagement.css';

// Mock company info auto-populated for US company
const COMPANY_INFO = {
  accountNumber: 'ACC-001234',
  companyName: 'LSO Logistics Inc.',
  companyPhone: '(214) 352-8600',
  addressOne: '2500 Regent Blvd',
  bldgSite: 'Suite 200',
  city: 'Dallas',
  state: 'TX',
  zip: '75261',
};

const emptyForm: NewUserData = {
  loginUsername: '', firstName: '', lastName: '', email: '',
  password: '', confirmPassword: '',
  billingRefRequired: false, userAdmin: false, showOnlyUserShipment: false,
  accountNumber: COMPANY_INFO.accountNumber,
  companyName: COMPANY_INFO.companyName,
  companyPhone: COMPANY_INFO.companyPhone,
  addressOne: COMPANY_INFO.addressOne,
  bldgSite: COMPANY_INFO.bldgSite,
  city: COMPANY_INFO.city,
  state: COMPANY_INFO.state,
  zip: COMPANY_INFO.zip,
  role: UserRole.STANDARD_USER,
};

type TouchedFields = { [K in keyof NewUserData]?: boolean };

const UserManagement: React.FC<UserManagementProps> = ({ users, onAddUser, onToggleStatus }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AccountUser | null>(null);
  const [formData, setFormData] = useState<NewUserData>({ ...emptyForm });
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ show: boolean; user: AccountUser | null }>({ show: false, user: null });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRules = [
    { label: 'lowercase', test: (v: string) => /[a-z]/.test(v) },
    { label: 'uppercase', test: (v: string) => /[A-Z]/.test(v) },
    { label: 'number', test: (v: string) => /[0-9]/.test(v) },
    { label: 'special char', test: (v: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v) },
    { label: '8+ chars', test: (v: string) => v.length >= 8 },
  ];

  const isPasswordValid = (pw: string) => passwordRules.every(r => r.test(pw));

  const getRequiredFields = (): (keyof NewUserData)[] => {
    if (editingUser) {
      return ['firstName', 'lastName', 'password', 'confirmPassword'];
    }
    return ['loginUsername', 'firstName', 'lastName', 'email', 'password', 'confirmPassword'];
  };

  const getFieldError = (field: keyof NewUserData): string | null => {
    const val = formData[field];
    const required = getRequiredFields();
    if (required.includes(field) && typeof val === 'string' && !val.trim()) return 'Required';
    if (field === 'email' && typeof val === 'string' && val && !validateEmail(val)) return 'Invalid email';
    if (field === 'password' && typeof val === 'string' && val && !isPasswordValid(val)) return 'Password does not meet requirements';
    if (field === 'confirmPassword' && formData.confirmPassword && formData.confirmPassword !== formData.password) return 'Passwords do not match';
    return null;
  };

  const showError = (field: keyof NewUserData) => (touched[field] || submitAttempted) && !!getFieldError(field);
  const handleBlur = (field: keyof NewUserData) => setTouched(p => ({ ...p, [field]: true }));
  const setField = (field: keyof NewUserData, value: string | boolean) => setFormData(p => ({ ...p, [field]: value }));

  const handleAddNewUser = () => {
    setEditingUser(null);
    setFormData({ ...emptyForm });
    setTouched({});
    setSubmitAttempted(false);
    setShowDialog(true);
  };

  const handleEditUser = (user: AccountUser) => {
    setEditingUser(user);
    setFormData({ ...emptyForm, loginUsername: user.loginUsername, email: user.email, firstName: user.firstName, lastName: user.lastName, accountNumber: user.accountNumber, role: user.role });
    setTouched({});
    setSubmitAttempted(false);
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (getRequiredFields().some(f => !!getFieldError(f))) return;
    if (editingUser) {
      console.log('Updating user:', editingUser.id, formData);
    } else {
      onAddUser(formData);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingUser(null);
    setFormData({ ...emptyForm });
    setTouched({});
    setSubmitAttempted(false);
  };

  const handleToggleClick = (user: AccountUser) => {
    setConfirmDialog({ show: true, user });
  };

  const handleConfirmToggle = () => {
    if (confirmDialog.user) {
      onToggleStatus(confirmDialog.user.id);
    }
    setConfirmDialog({ show: false, user: null });
  };

  const handleCancelToggle = () => {
    setConfirmDialog({ show: false, user: null });
  };

  const renderInput = (field: keyof NewUserData, label: string, opts?: { type?: string; required?: boolean; placeholder?: string }) => {
    const { type = 'text', required = true, placeholder } = opts || {};
    const error = showError(field) ? getFieldError(field) : null;
    return (
      <div className={`form-field ${error ? 'has-error' : ''}`}>
        <label htmlFor={field}>{label}{required && <span className="required-star">*</span>}</label>
        <input id={field} type={type} value={formData[field] as string}
          onChange={(e) => setField(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          placeholder={placeholder || `Enter ${label.toLowerCase().replace(' *', '')}`}
          autoComplete="off" />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  };

  const renderCheckbox = (field: keyof NewUserData, label: string) => (
    <label className="checkbox-field">
      <input type="checkbox" checked={formData[field] as boolean} onChange={(e) => setField(field, e.target.checked)} />
      <span>{label}</span>
    </label>
  );

  const renderReadonlyField = (label: string, value: string) => (
    <div className="readonly-field">
      <span className="readonly-label">{label}</span>
      <span className="readonly-value">{value}</span>
    </div>
  );

  const getRoleLabel = (role: UserRole) => role === UserRole.ADMIN ? 'Admin' : 'Standard User';

  const isDisabling = confirmDialog.user?.status === UserStatus.ACTIVE;

  return (
    <div className="user-management" data-testid="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button className="add-user-button" onClick={handleAddNewUser}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add New User
        </button>
      </div>

      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Login / Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Account Number</th>
              <th>Role</th>
              <th>User Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} data-testid={`user-${user.id}`}>
                <td>{user.loginUsername}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.accountNumber}</td>
                <td><span className={`role-badge ${user.role}`}>{getRoleLabel(user.role)}</span></td>
                <td><span className={`status-badge ${user.status}`}>{user.status === UserStatus.ACTIVE ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-button" onClick={() => handleEditUser(user)} title="Edit user">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className={`toggle-status-button ${user.status === UserStatus.ACTIVE ? 'disable' : 'enable'}`}
                      onClick={() => handleToggleClick(user)}
                    >
                      {user.status === UserStatus.ACTIVE ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enable/Disable Confirmation Dialog */}
      {confirmDialog.show && confirmDialog.user && (
        <div className="dialog-overlay" onClick={handleCancelToggle}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-dialog-header">
              <h3>{isDisabling ? 'Disable User' : 'Enable User'}</h3>
              <button className="dialog-close" onClick={handleCancelToggle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="confirm-dialog-body">
              <div className="confirm-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#F59E0B"/>
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p>
                Are you sure you want to {isDisabling ? 'disable' : 'enable'} the user<br/>
                "{confirmDialog.user.loginUsername}"?
              </p>
            </div>
            <div className="confirm-dialog-footer">
              <button className="confirm-btn-cancel" onClick={handleCancelToggle}>Cancel</button>
              <button className="confirm-btn-ok" onClick={handleConfirmToggle}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Dialog */}
      {showDialog && (
        <div className="dialog-overlay" onClick={handleCloseDialog}>
          <div className="dialog-box dialog-wide" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button className="dialog-close" onClick={handleCloseDialog}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="dialog-body dialog-body-columns">
                <div className="dialog-column">
                  <h4 className="column-title">User Information</h4>
                  <div className="fields-row">
                    {editingUser
                      ? renderReadonlyField('Login / Username *', formData.loginUsername)
                      : renderInput('loginUsername', 'Login / Username', { placeholder: 'Enter your username' })}
                    {editingUser
                      ? renderReadonlyField('Email Address *', formData.email)
                      : renderInput('email', 'Email Address', { type: 'email', placeholder: 'Enter your email address' })}
                  </div>
                  <div className="fields-row">
                    {renderInput('firstName', 'First Name', { placeholder: 'Enter first name' })}
                    {renderInput('lastName', 'Last Name', { placeholder: 'Enter last name' })}
                  </div>
                  <div className="fields-row">
                    {renderInput('password', editingUser ? 'Current Password' : 'Password', { type: 'password', placeholder: editingUser ? 'Enter current password' : 'Enter password' })}
                    {renderInput('confirmPassword', editingUser ? 'New Password' : 'Confirm Password', { type: 'password', placeholder: editingUser ? 'Enter new password' : 'Enter confirm password' })}
                  </div>
                  {/* Password requirements hint */}
                  {(formData.password || touched.password || submitAttempted) && (
                    <div className="password-rules">
                      <p className="password-rules-title">Password must contain:</p>
                      <div className="password-rules-list">
                        {passwordRules.map((rule) => (
                          <span key={rule.label} className={`password-rule ${formData.password && rule.test(formData.password) ? 'met' : 'unmet'}`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              {formData.password && rule.test(formData.password) ? (
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
                  {/* Password mismatch hint */}
                  {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                    <div className="password-mismatch-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                        <path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character</span>
                    </div>
                  )}
                  <div className="checkbox-group-inline">
                    {renderCheckbox('billingRefRequired', 'Billing Reference Required')}
                    {renderCheckbox('userAdmin', 'User Admin')}
                    {renderCheckbox('showOnlyUserShipment', 'Show only user shipment')}
                  </div>
                </div>
                <div className="column-divider"></div>
                <div className="dialog-column">
                  <h4 className="column-title">Company Information</h4>
                  <div className="fields-row">
                    {renderReadonlyField('Account Number', COMPANY_INFO.accountNumber)}
                    {renderReadonlyField('Company Name', COMPANY_INFO.companyName)}
                  </div>
                  <div className="fields-row">
                    {renderReadonlyField('Company Phone', COMPANY_INFO.companyPhone)}
                    {renderReadonlyField('Address One', COMPANY_INFO.addressOne)}
                  </div>
                  <div className="fields-row">
                    {renderReadonlyField('Bldg Site', COMPANY_INFO.bldgSite)}
                    {renderReadonlyField('City', COMPANY_INFO.city)}
                  </div>
                  <div className="fields-row">
                    {renderReadonlyField('State', COMPANY_INFO.state)}
                    {renderReadonlyField('Zip', COMPANY_INFO.zip)}
                  </div>
                </div>
              </div>
              <div className="dialog-footer">
                <button type="button" className="dialog-btn-cancel" onClick={handleCloseDialog}>Cancel</button>
                <button type="submit" className="dialog-btn-confirm">
                  {editingUser ? 'Update User' : 'Request Membership Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
