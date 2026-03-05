import React, { useState } from 'react';
import { UserManagementProps } from '../types/components';
import { NewUserData, UserRole, AccountUser } from '../types/models';
import './UserManagement.css';

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onAddUser,
  onRemoveUser,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AccountUser | null>(null);
  const [formData, setFormData] = useState<NewUserData>({
    email: '',
    firstName: '',
    lastName: '',
    accountNumber: '',
    role: UserRole.USER,
  });
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, email });
    if (email && !validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(null);
    }
  };

  const handleAddNewUser = () => {
    setEditingUser(null);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      accountNumber: '',
      role: UserRole.USER,
    });
    setEmailError(null);
    setShowDialog(true);
  };

  const handleEditUser = (user: AccountUser) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      accountNumber: user.accountNumber,
      role: user.role,
    });
    setEmailError(null);
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }
    
    if (editingUser) {
      // Update existing user
      // In a real app, you would call an update function here
      console.log('Updating user:', editingUser.id, formData);
    } else {
      // Add new user
      onAddUser(formData);
    }
    
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingUser(null);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      accountNumber: '',
      role: UserRole.USER,
    });
    setEmailError(null);
  };

  return (
    <div className="user-management" data-testid="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button
          className="add-user-button"
          onClick={handleAddNewUser}
        >
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Account Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} data-testid={`user-${user.id}`}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.accountNumber}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEditUser(user)}
                      title="Edit user"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => onRemoveUser(user.id)}
                      title="Remove user"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Dialog */}
      {showDialog && (
        <div className="dialog-overlay" onClick={handleCloseDialog}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button className="dialog-close" onClick={handleCloseDialog}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="dialog-body">
                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                  {emailError && (
                    <span className="error-message" data-testid="email-error">
                      {emailError}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="accountNumber">Account Number</label>
                  <input
                    id="accountNumber"
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, accountNumber: e.target.value })
                    }
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as UserRole })
                    }
                  >
                    <option value={UserRole.VIEWER}>Viewer</option>
                    <option value={UserRole.USER}>User</option>
                    <option value={UserRole.ADMIN}>Admin</option>
                  </select>
                </div>
              </div>
              <div className="dialog-footer">
                <button type="button" className="dialog-btn-cancel" onClick={handleCloseDialog}>
                  Cancel
                </button>
                <button type="submit" className="dialog-btn-confirm" disabled={!!emailError}>
                  {editingUser ? 'Update User' : 'Send Invitation'}
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
