import React, { useState } from 'react';
import { UserManagementProps } from '../types/components';
import { NewUserData, UserRole } from '../types/models';
import './UserManagement.css';

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onAddUser,
  onRemoveUser,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<NewUserData>({
    email: '',
    firstName: '',
    lastName: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }
    onAddUser(formData);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      role: UserRole.USER,
    });
    setIsAdding(false);
    setEmailError(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
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
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          + Add New User
        </button>
      </div>

      {isAdding && (
        <form className="user-form" onSubmit={handleSubmit}>
          <h3>Add New User</h3>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
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
                required
              />
              {emailError && (
                <span className="error-message" data-testid="email-error">
                  {emailError}
                </span>
              )}
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
          <div className="form-actions">
            <button type="submit" className="save-button" disabled={!!emailError}>
              Send Invitation
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} data-testid={`user-${user.id}`}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
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
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString()
                    : 'Never'}
                </td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => onRemoveUser(user.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
