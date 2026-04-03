import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CancelPickup.css';

interface PickupRecord {
  id: string;
  confirmationNo: string;
  accountNo: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  contactName: string;
  packages: number;
  totalWeight: string;
  specialInstructions: string;
  createdDate: string;
}

const mockPickups: PickupRecord[] = [
  {
    id: '1',
    confirmationNo: 'PU-2026-001847',
    accountNo: '12345',
    status: 'Scheduled',
    scheduledDate: '2026-03-26',
    scheduledTime: '2:00 PM - 5:00 PM',
    address: '1200 Main Street',
    city: 'Dallas',
    state: 'TX',
    zip: '75050',
    country: 'United States',
    phone: '(214) 555-0142',
    contactName: 'Andy Johnson',
    packages: 3,
    totalWeight: '12.5',
    specialInstructions: 'Ring doorbell, packages at front desk.',
    createdDate: '2026-03-22',
  },
  {
    id: '2',
    confirmationNo: 'PU-2026-001832',
    accountNo: '12345',
    status: 'Scheduled',
    scheduledDate: '2026-03-27',
    scheduledTime: '10:00 AM - 1:00 PM',
    address: '4500 Commerce St, Suite 200',
    city: 'Fort Worth',
    state: 'TX',
    zip: '76102',
    country: 'United States',
    phone: '(817) 555-0198',
    contactName: 'Sarah Miller',
    packages: 1,
    totalWeight: '4.2',
    specialInstructions: '',
    createdDate: '2026-03-21',
  },
  {
    id: '3',
    confirmationNo: 'PU-2026-001790',
    accountNo: '99999',
    status: 'Completed',
    scheduledDate: '2026-03-20',
    scheduledTime: '1:00 PM - 4:00 PM',
    address: '789 Oak Avenue',
    city: 'Austin',
    state: 'TX',
    zip: '76087',
    country: 'United States',
    phone: '(512) 555-0234',
    contactName: 'Mike Chen',
    packages: 5,
    totalWeight: '28.0',
    specialInstructions: 'Use loading dock entrance.',
    createdDate: '2026-03-18',
  },
  {
    id: '4',
    confirmationNo: 'PU-2026-001755',
    accountNo: '12345',
    status: 'Cancelled',
    scheduledDate: '2026-03-19',
    scheduledTime: '9:00 AM - 12:00 PM',
    address: '320 Elm Street',
    city: 'Plano',
    state: 'TX',
    zip: '75024',
    country: 'United States',
    phone: '(972) 555-0167',
    contactName: 'Lisa Wang',
    packages: 2,
    totalWeight: '8.0',
    specialInstructions: '',
    createdDate: '2026-03-16',
  },
  {
    id: '5',
    confirmationNo: 'PU-2026-001710',
    accountNo: '12345',
    status: 'Completed',
    scheduledDate: '2026-03-17',
    scheduledTime: '3:00 PM - 6:00 PM',
    address: '1200 Main Street',
    city: 'Dallas',
    state: 'TX',
    zip: '75050',
    country: 'United States',
    phone: '(214) 555-0142',
    contactName: 'Andy Johnson',
    packages: 1,
    totalWeight: '2.3',
    specialInstructions: 'Leave at reception.',
    createdDate: '2026-03-15',
  },
];

type FilterStatus = 'All' | 'Scheduled' | 'Completed' | 'Cancelled';
type ViewMode = 'list' | 'detail';

const CancelPickup: React.FC = () => {
  const navigate = useNavigate();
  const [pickups, setPickups] = useState<PickupRecord[]>(mockPickups);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPickup, setSelectedPickup] = useState<PickupRecord | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelConfirmNo, setCancelConfirmNo] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [sortField, setSortField] = useState<'scheduledDate' | 'createdDate' | 'status'>('scheduledDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filteredPickups = pickups
    .filter(p => filterStatus === 'All' || p.status === filterStatus)
    .filter(p => {
      if (!searchTerm.trim()) return true;
      const s = searchTerm.toLowerCase();
      return p.confirmationNo.toLowerCase().includes(s)
        || p.contactName.toLowerCase().includes(s)
        || p.address.toLowerCase().includes(s)
        || p.city.toLowerCase().includes(s)
        || p.accountNo.includes(s);
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'scheduledDate') cmp = a.scheduledDate.localeCompare(b.scheduledDate);
      else if (sortField === 'createdDate') cmp = a.createdDate.localeCompare(b.createdDate);
      else cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const statusCounts = {
    All: pickups.length,
    Scheduled: pickups.filter(p => p.status === 'Scheduled').length,
    Completed: pickups.filter(p => p.status === 'Completed').length,
    Cancelled: pickups.filter(p => p.status === 'Cancelled').length,
  };

  const handleViewDetail = (pickup: PickupRecord) => {
    setSelectedPickup(pickup);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedPickup(null);
  };

  const handleOpenCancel = (pickup: PickupRecord) => {
    setSelectedPickup(pickup);
    setCancelReason('');
    setCancelConfirmNo('');
    setCancelSuccess(false);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (!selectedPickup) return;
    setPickups(prev => prev.map(p =>
      p.id === selectedPickup.id ? { ...p, status: 'Cancelled' as const } : p
    ));
    setCancelSuccess(true);
    if (viewMode === 'detail') {
      setSelectedPickup({ ...selectedPickup, status: 'Cancelled' });
    }
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
    setCancelSuccess(false);
  };

  const handleSort = (field: 'scheduledDate' | 'createdDate' | 'status') => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const formatDate = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'mp-status-scheduled';
      case 'Completed': return 'mp-status-completed';
      case 'Cancelled': return 'mp-status-cancelled';
      default: return '';
    }
  };

  const sortIcon = (field: string) => {
    if (sortField !== field) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="manage-pickup-page">
      <div className="mp-content">
        {/* Page Title */}
        <div className="mp-page-title">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="#0d3b66" strokeWidth="2"/>
            <path d="M3 10h18" stroke="#0d3b66" strokeWidth="2"/>
            <path d="M8 2v4M16 2v4" stroke="#0d3b66" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="15" r="2" fill="#0d3b66"/>
          </svg>
          <h1>Manage Pickups</h1>
        </div>
        <p className="mp-description">
          View, track, and manage all your scheduled pickups. You can also{' '}
          <button type="button" className="mp-inline-link" onClick={() => navigate('/dashboard/schedule-pickup')}>schedule a new pickup</button>{' '}
          or cancel an existing one.
        </p>

        {/* Stats Cards */}
        <div className="mp-stats-row">
          {(['All', 'Scheduled', 'Completed', 'Cancelled'] as FilterStatus[]).map(s => (
            <button
              key={s}
              className={`mp-stat-card ${filterStatus === s ? 'active' : ''} ${s === 'Scheduled' ? 'stat-scheduled' : s === 'Completed' ? 'stat-completed' : s === 'Cancelled' ? 'stat-cancelled' : 'stat-all'}`}
              onClick={() => setFilterStatus(s)}
            >
              <span className="mp-stat-count">{statusCounts[s]}</span>
              <span className="mp-stat-label">{s}</span>
            </button>
          ))}
        </div>

        {viewMode === 'list' && (
          <>
            {/* Search & Actions Bar */}
            <div className="mp-toolbar">
              <div className="mp-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mp-search-icon">
                  <circle cx="11" cy="11" r="7" stroke="#999" strokeWidth="2"/>
                  <path d="M16 16l4.5 4.5" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by confirmation #, name, address..."
                />
                {searchTerm && (
                  <button type="button" className="mp-search-clear" onClick={() => setSearchTerm('')}>×</button>
                )}
              </div>
              <button type="button" className="mp-btn-schedule" onClick={() => navigate('/dashboard/schedule-pickup')}>
                + Schedule New Pickup
              </button>
            </div>

            {/* Table */}
            <div className="mp-table-wrapper">
              <table className="mp-table">
                <thead>
                  <tr>
                    <th>Confirmation #</th>
                    <th className="mp-th-sortable" onClick={() => handleSort('status')}>
                      Status {sortIcon('status')}
                    </th>
                    <th className="mp-th-sortable" onClick={() => handleSort('scheduledDate')}>
                      Pickup Date {sortIcon('scheduledDate')}
                    </th>
                    <th>Time Window</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Pkgs</th>
                    <th className="mp-th-sortable" onClick={() => handleSort('createdDate')}>
                      Created {sortIcon('createdDate')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPickups.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="mp-empty-row">
                        <div className="mp-empty-state">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="16" rx="2" stroke="#ccc" strokeWidth="1.5"/>
                            <path d="M3 10h18" stroke="#ccc" strokeWidth="1.5"/>
                            <path d="M9 15l2 2 4-4" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>No pickups found matching your criteria.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredPickups.map(p => (
                      <tr key={p.id} className={p.status === 'Cancelled' ? 'mp-row-cancelled' : ''}>
                        <td>
                          <button type="button" className="mp-confirm-link" onClick={() => handleViewDetail(p)}>
                            {p.confirmationNo}
                          </button>
                        </td>
                        <td><span className={`mp-status-badge ${getStatusClass(p.status)}`}>{p.status}</span></td>
                        <td>{formatDate(p.scheduledDate)}</td>
                        <td className="mp-td-time">{p.scheduledTime}</td>
                        <td className="mp-td-contact">{p.contactName}</td>
                        <td className="mp-td-address">{p.city}, {p.state} {p.zip}</td>
                        <td className="mp-td-center">{p.packages}</td>
                        <td>{formatDate(p.createdDate)}</td>
                        <td>
                          <div className="mp-actions-cell">
                            <button type="button" className="mp-btn-view" onClick={() => handleViewDetail(p)} title="View details">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                            </button>
                            {p.status === 'Scheduled' && (
                              <button type="button" className="mp-btn-cancel-action" onClick={() => handleOpenCancel(p)} title="Cancel pickup">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Results count */}
            <div className="mp-results-count">
              Showing {filteredPickups.length} of {pickups.length} pickups
            </div>
          </>
        )}

        {/* Detail View */}
        {viewMode === 'detail' && selectedPickup && (
          <div className="mp-detail-view">
            <button type="button" className="mp-back-btn" onClick={handleBackToList}>
              ← Back to all pickups
            </button>

            <div className="mp-detail-header">
              <div className="mp-detail-title-row">
                <h2>{selectedPickup.confirmationNo}</h2>
                <span className={`mp-status-badge mp-status-badge-lg ${getStatusClass(selectedPickup.status)}`}>
                  {selectedPickup.status}
                </span>
              </div>
              {selectedPickup.status === 'Scheduled' && (
                <button type="button" className="mp-btn-cancel-detail" onClick={() => handleOpenCancel(selectedPickup)}>
                  Cancel This Pickup
                </button>
              )}
            </div>

            <div className="mp-detail-grid">
              {/* Pickup Info */}
              <div className="mp-detail-card">
                <div className="mp-detail-card-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0d3b66" strokeWidth="2"/><path d="M3 10h18" stroke="#0d3b66" strokeWidth="2"/><path d="M8 2v4M16 2v4" stroke="#0d3b66" strokeWidth="2" strokeLinecap="round"/></svg>
                  Pickup Schedule
                </div>
                <div className="mp-detail-card-body">
                  <div className="mp-detail-row"><span className="mp-detail-label">Date</span><span className="mp-detail-value">{formatDate(selectedPickup.scheduledDate)}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Time Window</span><span className="mp-detail-value">{selectedPickup.scheduledTime}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Packages</span><span className="mp-detail-value">{selectedPickup.packages}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Total Weight</span><span className="mp-detail-value">{selectedPickup.totalWeight} lbs</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Created</span><span className="mp-detail-value">{formatDate(selectedPickup.createdDate)}</span></div>
                </div>
              </div>

              {/* Address Info */}
              <div className="mp-detail-card">
                <div className="mp-detail-card-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#0d3b66" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#0d3b66" strokeWidth="2"/></svg>
                  Pickup Address
                </div>
                <div className="mp-detail-card-body">
                  <div className="mp-detail-row"><span className="mp-detail-label">Contact</span><span className="mp-detail-value">{selectedPickup.contactName}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Phone</span><span className="mp-detail-value">{selectedPickup.phone}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Address</span><span className="mp-detail-value">{selectedPickup.address}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">City/State/Zip</span><span className="mp-detail-value">{selectedPickup.city}, {selectedPickup.state} {selectedPickup.zip}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Country</span><span className="mp-detail-value">{selectedPickup.country}</span></div>
                  <div className="mp-detail-row"><span className="mp-detail-label">Account No.</span><span className="mp-detail-value">{selectedPickup.accountNo}</span></div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {selectedPickup.specialInstructions && (
              <div className="mp-detail-instructions">
                <div className="mp-detail-card-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#0d3b66" strokeWidth="2"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="#0d3b66" strokeWidth="2" strokeLinecap="round"/></svg>
                  Special Instructions
                </div>
                <p className="mp-instructions-text">{selectedPickup.specialInstructions}</p>
              </div>
            )}

            {/* Detail Actions */}
            <div className="mp-detail-actions">
              <button type="button" className="mp-btn-outline" onClick={handleBackToList}>Back to List</button>
              <button type="button" className="mp-btn-schedule" onClick={() => navigate('/dashboard/schedule-pickup')}>Schedule New Pickup</button>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && selectedPickup && (
          <div className="mp-modal-overlay" onClick={handleCloseModal}>
            <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
              {!cancelSuccess ? (
                <>
                  <div className="mp-modal-header">
                    <h3>Cancel Pickup</h3>
                    <button type="button" className="mp-modal-close" onClick={handleCloseModal}>×</button>
                  </div>
                  <div className="mp-modal-body">
                    <div className="mp-modal-warning">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#dc2626" strokeWidth="2"/></svg>
                      <span>Are you sure you want to cancel this pickup?</span>
                    </div>
                    <div className="mp-modal-info">
                      <div className="mp-modal-info-row"><span>Confirmation #:</span><span>{selectedPickup.confirmationNo}</span></div>
                      <div className="mp-modal-info-row"><span>Scheduled Date:</span><span>{formatDate(selectedPickup.scheduledDate)}</span></div>
                      <div className="mp-modal-info-row"><span>Address:</span><span>{selectedPickup.address}, {selectedPickup.city}</span></div>
                    </div>
                    <div className="mp-modal-field">
                      <label>Confirmation Number<span className="required-star">*</span></label>
                      <input
                        type="text"
                        value={cancelConfirmNo}
                        onChange={(e) => setCancelConfirmNo(e.target.value)}
                        placeholder={`Type "${selectedPickup.confirmationNo}" to confirm`}
                      />
                    </div>
                    <div className="mp-modal-field">
                      <label>Reason for cancellation (optional)</label>
                      <textarea
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Enter reason..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mp-modal-footer">
                    <button type="button" className="mp-btn-outline" onClick={handleCloseModal}>Keep Pickup</button>
                    <button
                      type="button"
                      className="mp-btn-danger"
                      disabled={cancelConfirmNo !== selectedPickup.confirmationNo}
                      onClick={handleConfirmCancel}
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mp-modal-header">
                    <h3>Pickup Cancelled</h3>
                    <button type="button" className="mp-modal-close" onClick={handleCloseModal}>×</button>
                  </div>
                  <div className="mp-modal-body mp-modal-success">
                    <div className="mp-success-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2"/><path d="M8 12l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="mp-success-text">Pickup <strong>{selectedPickup.confirmationNo}</strong> has been successfully cancelled.</p>
                    {cancelReason && <p className="mp-success-reason">Reason: {cancelReason}</p>}
                  </div>
                  <div className="mp-modal-footer mp-modal-footer-center">
                    <button type="button" className="mp-btn-primary" onClick={handleCloseModal}>Done</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelPickup;
