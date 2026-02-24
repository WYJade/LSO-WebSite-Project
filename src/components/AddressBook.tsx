import React, { useState } from 'react';
import { AddressBookProps } from '../types/components';
import { Address } from '../types/models';
import './AddressBook.css';

const AddressBook: React.FC<AddressBookProps> = ({
  addresses,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({});
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onEdit(editingId, formData as Address);
      setEditingId(null);
    } else {
      onAdd(formData as Address);
      setIsAdding(false);
    }
    setFormData({});
  };

  const handleDelete = (address: Address) => {
    if (address.inUse) {
      setDeleteWarning(`Cannot delete "${address.label}" - it is in use by active shipments`);
      setTimeout(() => setDeleteWarning(null), 5000);
      return;
    }
    onDelete(address.id);
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData(address);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="address-book" data-testid="address-book">
      <div className="address-book-header">
        <h2>Address Book</h2>
        <button
          className="add-button"
          onClick={() => setIsAdding(true)}
          disabled={isAdding || editingId !== null}
        >
          + Add New Address
        </button>
      </div>

      {deleteWarning && (
        <div className="warning-message" data-testid="delete-warning">
          {deleteWarning}
        </div>
      )}

      {(isAdding || editingId) && (
        <form className="address-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Address' : 'Add New Address'}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Label (e.g., Home, Office)"
              value={formData.label || ''}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Recipient Name"
              value={formData.recipientName || ''}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={formData.addressLine1 || ''}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address Line 2 (Optional)"
              value={formData.addressLine2 || ''}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state || ''}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.postalCode || ''}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.country || ''}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              {editingId ? 'Update' : 'Save'}
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="address-list">
        {addresses.map((address) => (
          <div key={address.id} className="address-card" data-testid={`address-${address.id}`}>
            <div className="address-header">
              <h3>{address.label}</h3>
              {address.isDefault && <span className="default-badge">Default</span>}
            </div>
            <div className="address-details">
              <p><strong>{address.recipientName}</strong></p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>{address.city}, {address.state} {address.postalCode}</p>
              <p>{address.country}</p>
              <p>Phone: {address.phone}</p>
            </div>
            <div className="address-actions">
              <button onClick={() => handleEdit(address)} className="edit-button">
                Edit
              </button>
              <button
                onClick={() => handleDelete(address)}
                className="delete-button"
                data-testid={`delete-address-${address.id}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
