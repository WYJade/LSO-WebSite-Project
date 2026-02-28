import React, { useState, useMemo } from 'react';
import { AddressBookProps } from '../types/components';
import { Address } from '../types/models';
import './AddressBook.css';

// Extended Address interface with quickcode and company
interface AddressBookEntry extends Address {
  quickCode: string;
  company?: string;
}

type ViewMode = 'table' | 'edit-quickcodes';
type DialogMode = 'none' | 'add' | 'edit' | 'import' | 'export';

const AddressBook: React.FC<AddressBookProps> = ({
  addresses,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [selectedAddresses, setSelectedAddresses] = useState<Set<string>>(new Set());
  // const [isLoading, setIsLoading] = useState(false); // Reserved for future use
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [dialogMode, setDialogMode] = useState<DialogMode>('none');
  const [editingAddress, setEditingAddress] = useState<AddressBookEntry | null>(null);
  const [formData, setFormData] = useState<Partial<AddressBookEntry>>({});
  const [importOption, setImportOption] = useState<'replace' | 'add'>('add');
  const [exportFormat, setExportFormat] = useState<'csv' | 'xls'>('csv');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const itemsPerPage = 10;

  // Sample data for demonstration
  const sampleAddresses: AddressBookEntry[] = [
    {
      id: '1',
      quickCode: 'HOME01',
      recipientName: 'John Smith',
      phone: '(555) 123-4567',
      company: 'Tech Solutions Inc.',
      addressLine1: '742 Evergreen Terrace',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
      label: 'Home',
      isDefault: false,
      inUse: false,
    },
    {
      id: '2',
      quickCode: 'OFFICE',
      recipientName: 'Sarah Johnson',
      phone: '(555) 234-5678',
      company: 'Global Imports LLC',
      addressLine1: '1234 Business Park Drive',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      label: 'Office',
      isDefault: true,
      inUse: true,
    },
    {
      id: '3',
      quickCode: 'WARE01',
      recipientName: 'Michael Brown',
      phone: '(555) 345-6789',
      company: 'Retail Distributors Co.',
      addressLine1: '5678 Warehouse Lane',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postalCode: '60601',
      label: 'Warehouse',
      isDefault: false,
      inUse: false,
    },
    {
      id: '4',
      quickCode: 'STORE1',
      recipientName: 'Emily Davis',
      phone: '(555) 456-7890',
      company: 'Manufacturing Plus',
      addressLine1: '9012 Industrial Blvd',
      city: 'Houston',
      state: 'TX',
      country: 'USA',
      postalCode: '77001',
      label: 'Store',
      isDefault: false,
      inUse: false,
    },
    {
      id: '5',
      quickCode: 'DEPOT',
      recipientName: 'Robert Wilson',
      phone: '(555) 567-8901',
      company: 'E-Commerce Solutions',
      addressLine1: '3456 Distribution Center',
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA',
      postalCode: '85001',
      label: 'Depot',
      isDefault: false,
      inUse: true,
    },
    {
      id: '6',
      quickCode: 'BRANCH',
      recipientName: 'Jennifer Martinez',
      phone: '(555) 678-9012',
      company: 'Logistics Partners',
      addressLine1: '7890 Commerce Street',
      city: 'Philadelphia',
      state: 'PA',
      country: 'USA',
      postalCode: '19101',
      label: 'Branch',
      isDefault: false,
      inUse: false,
    },
    {
      id: '7',
      quickCode: 'HQ',
      recipientName: 'David Anderson',
      phone: '(555) 789-0123',
      company: 'Corporate Headquarters',
      addressLine1: '2468 Executive Plaza',
      city: 'San Antonio',
      state: 'TX',
      country: 'USA',
      postalCode: '78201',
      label: 'HQ',
      isDefault: false,
      inUse: false,
    },
  ];

  // Use sample data if no addresses provided
  const allAddresses: AddressBookEntry[] = addresses.length > 0 ? addresses.map((addr, idx) => ({
    ...addr,
    quickCode: addr.label?.toUpperCase() || `QC${idx + 1}`,
    company: (addr as any).company || '',
  })) : sampleAddresses;

  // Filter addresses based on search query
  const filteredAddresses = useMemo(() => {
    if (!searchQuery.trim()) return allAddresses;
    
    const query = searchQuery.toLowerCase();
    return allAddresses.filter((addr: AddressBookEntry) =>
      addr.quickCode.toLowerCase().includes(query) ||
      addr.recipientName.toLowerCase().includes(query) ||
      addr.phone.includes(query) ||
      (addr.company && addr.company.toLowerCase().includes(query)) ||
      addr.addressLine1.toLowerCase().includes(query) ||
      addr.city.toLowerCase().includes(query) ||
      addr.state.toLowerCase().includes(query) ||
      addr.country.toLowerCase().includes(query) ||
      addr.postalCode.includes(query)
    );
  }, [allAddresses, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAddresses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAddresses = filteredAddresses.slice(startIndex, endIndex);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPage('');
    }
  };

  const handleSelectAddress = (id: string) => {
    const newSelected = new Set(selectedAddresses);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAddresses(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAddresses.size === currentAddresses.length) {
      setSelectedAddresses(new Set());
    } else {
      setSelectedAddresses(new Set(currentAddresses.map((addr: AddressBookEntry) => addr.id)));
    }
  };

  const handleNew = () => {
    setFormData({
      quickCode: '',
      recipientName: '',
      phone: '',
      company: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'USA',
      label: '',
      isDefault: false,
      inUse: false,
    });
    setEditingAddress(null);
    setDialogMode('add');
  };

  const handleEdit = (address: AddressBookEntry) => {
    setFormData(address);
    setEditingAddress(address);
    setDialogMode('edit');
  };

  const handleSaveAddress = () => {
    if (!formData.quickCode || !formData.recipientName || !formData.phone || 
        !formData.addressLine1 || !formData.city || !formData.state || 
        !formData.postalCode || !formData.country) {
      alert('Please fill in all required fields');
      return;
    }

    const addressData: Address = {
      id: editingAddress?.id || Date.now().toString(),
      label: formData.label || formData.quickCode || '',
      recipientName: formData.recipientName,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      phone: formData.phone,
      isDefault: formData.isDefault || false,
      inUse: formData.inUse || false,
    };

    if (editingAddress) {
      onEdit(editingAddress.id, addressData);
    } else {
      onAdd(addressData);
    }

    setDialogMode('none');
    setFormData({});
    setEditingAddress(null);
  };

  const handleCancelDialog = () => {
    setDialogMode('none');
    setFormData({});
    setEditingAddress(null);
    setSelectedFile(null);
  };

  const handleDelete = () => {
    if (selectedAddresses.size === 0) {
      alert('Please select at least one address to delete');
      return;
    }
    
    const hasInUse = Array.from(selectedAddresses).some(id => {
      const addr = allAddresses.find((a: AddressBookEntry) => a.id === id);
      return addr?.inUse;
    });

    if (hasInUse) {
      alert('Cannot delete addresses that are in use by active shipments');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedAddresses.size} address(es)?`)) {
      selectedAddresses.forEach(id => onDelete(id));
      setSelectedAddresses(new Set());
    }
  };

  const handleImport = () => {
    setImportOption('add');
    setSelectedFile(null);
    setDialogMode('import');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImportConfirm = () => {
    if (!selectedFile) {
      alert('Please select a file to import');
      return;
    }

    // Simulate import process
    console.log(`Importing ${selectedFile.name} with option: ${importOption}`);
    alert(`Successfully imported addresses from ${selectedFile.name}`);
    setDialogMode('none');
    setSelectedFile(null);
  };

  const handleExport = () => {
    setExportFormat('csv');
    setDialogMode('export');
  };

  const handleExportConfirm = () => {
    // Simulate export process
    const filename = `address_book.${exportFormat}`;
    console.log(`Exporting addresses as ${filename}`);
    alert(`Successfully exported ${filteredAddresses.length} addresses as ${filename}`);
    setDialogMode('none');
  };

  return (
    <div className="address-book-container" data-testid="address-book">
      <div className="address-book-header">
        <h2>Your Address book</h2>
      </div>

      {/* Tab Navigation */}
      <div className="address-tabs">
        <button
          className={`tab-btn ${viewMode === 'edit-quickcodes' ? 'active' : ''}`}
          onClick={() => setViewMode('edit-quickcodes')}
        >
          Edit quick codes
        </button>
        <button
          className={`tab-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => setViewMode('table')}
        >
          View Table
        </button>
      </div>

      <div className="address-book-toolbar">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search Address book"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className="action-buttons">
          <button className="action-btn new-btn" onClick={handleNew}>
            New
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={handleDelete}
            disabled={selectedAddresses.size === 0}
          >
            Delete
          </button>
          <button className="action-btn import-btn" onClick={handleImport}>
            Import address
          </button>
          <button className="action-btn export-btn" onClick={handleExport}>
            Export address
          </button>
        </div>
      </div>

      {/* Loading spinner removed - reserved for future async data loading */}
      <div className="address-table-wrapper">
        <table className="address-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedAddresses.size === currentAddresses.length && currentAddresses.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>QUICKCODE</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>COMPANY</th>
              <th>ADDRESS</th>
              <th>CITY</th>
              <th>STATE</th>
              <th>COUNTRY</th>
              <th>ZIP</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentAddresses.map((address: AddressBookEntry) => (
              <tr 
                key={address.id}
                className={selectedAddresses.has(address.id) ? 'selected' : ''}
              >
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedAddresses.has(address.id)}
                    onChange={() => handleSelectAddress(address.id)}
                  />
                </td>
                <td className="quickcode-col">{address.quickCode}</td>
                <td>{address.recipientName}</td>
                <td>{address.phone}</td>
                <td>{address.company || '-'}</td>
                <td>{address.addressLine1}</td>
                <td>{address.city}</td>
                <td>{address.state}</td>
                <td>{address.country}</td>
                <td>{address.postalCode}</td>
                <td>
                  <button 
                    className="edit-icon-btn"
                    onClick={() => handleEdit(address)}
                    title="Edit address"
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <div className="pagination-buttons">
          <button
            className="page-btn"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            className="page-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
        
        <div className="go-to-page">
          <span>Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
          />
          <button onClick={handleGoToPage}>Go</button>
        </div>
      </div>

      {/* Add/Edit Address Dialog */}
      {(dialogMode === 'add' || dialogMode === 'edit') && (
        <div className="dialog-overlay" onClick={handleCancelDialog}>
          <div className="dialog-content address-form-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>{dialogMode === 'add' ? 'Add New Address' : 'Edit Address'}</h3>
              <button className="close-btn" onClick={handleCancelDialog}>×</button>
            </div>
            <div className="dialog-body">
              <div className="form-row">
                <div className="form-group">
                  <label>To quick code *</label>
                  <input
                    type="text"
                    value={formData.quickCode || ''}
                    onChange={(e) => setFormData({ ...formData, quickCode: e.target.value })}
                    placeholder="e.g., HOME01"
                  />
                </div>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={formData.recipientName || ''}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    placeholder="Recipient name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label>Address 1 *</label>
                  <input
                    type="text"
                    value={formData.addressLine1 || ''}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="Street address"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isDefault || false}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    />
                    Residence
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                  />
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Country"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Zip *</label>
                  <input
                    type="text"
                    value={formData.postalCode || ''}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="Postal code"
                  />
                </div>
                <div className="form-group">
                  <label>Address 2</label>
                  <input
                    type="text"
                    value={formData.addressLine2 || ''}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Apt, suite, etc."
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    value={formData.state || ''}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
                <div className="form-group">
                  <label>Billing Reference</label>
                  <input
                    type="text"
                    value={formData.label || ''}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Reference"
                  />
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="btn-secondary" onClick={handleCancelDialog}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveAddress}>
                {dialogMode === 'add' ? 'Add Address' : 'Update Address'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Dialog */}
      {dialogMode === 'import' && (
        <div className="dialog-overlay" onClick={handleCancelDialog}>
          <div className="dialog-content import-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Import Address</h3>
              <button className="close-btn" onClick={handleCancelDialog}>×</button>
            </div>
            <div className="dialog-body">
              <div className="file-upload-area">
                <input
                  type="file"
                  id="file-input"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-input" className="file-upload-label">
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">
                    {selectedFile ? selectedFile.name : 'Click to select file or drag and drop'}
                  </div>
                  <div className="upload-hint">Supported formats: CSV, XLS, XLSX</div>
                </label>
              </div>
              <div className="import-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="import-option"
                    value="replace"
                    checked={importOption === 'replace'}
                    onChange={() => setImportOption('replace')}
                  />
                  <span>Replace address book</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="import-option"
                    value="add"
                    checked={importOption === 'add'}
                    onChange={() => setImportOption('add')}
                  />
                  <span>Add to address book</span>
                </label>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="btn-secondary" onClick={handleCancelDialog}>Cancel</button>
              <button className="btn-primary" onClick={handleImportConfirm}>Import</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Dialog */}
      {dialogMode === 'export' && (
        <div className="dialog-overlay" onClick={handleCancelDialog}>
          <div className="dialog-content export-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Export Address</h3>
              <button className="close-btn" onClick={handleCancelDialog}>×</button>
            </div>
            <div className="dialog-body">
              <p className="export-info">Export {filteredAddresses.length} addresses</p>
              <div className="export-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="export-format"
                    value="csv"
                    checked={exportFormat === 'csv'}
                    onChange={() => setExportFormat('csv')}
                  />
                  <span>Export as .csv file</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="export-format"
                    value="xls"
                    checked={exportFormat === 'xls'}
                    onChange={() => setExportFormat('xls')}
                  />
                  <span>Export as .xls file</span>
                </label>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="btn-secondary" onClick={handleCancelDialog}>Cancel</button>
              <button className="btn-primary" onClick={handleExportConfirm}>Export</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
