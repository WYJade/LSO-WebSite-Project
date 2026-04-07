import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageShipment.css';

interface ShipmentRecord {
  airbillNo: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Cancelled';
  service: string;
  fromName: string;
  fromCity: string;
  fromState: string;
  fromZip: string;
  toName: string;
  toCity: string;
  toState: string;
  toZip: string;
  weight: string;
  pieces: number;
  declaredValue: string;
  createdDate: string;
  deliveryDate: string;
}

const mockShipments: ShipmentRecord[] = [
  {
    airbillNo: 'LSO-2026-004521',
    status: 'Delivered',
    service: 'LSO Priority Next Day™',
    fromName: 'Andy Lee',
    fromCity: 'Dallas', fromState: 'TX', fromZip: '75201',
    toName: 'Sarah Miller',
    toCity: 'Austin', toState: 'TX', toZip: '78754',
    weight: '5.2', pieces: 2, declaredValue: '250.00',
    createdDate: '2026-03-25', deliveryDate: '2026-03-26',
  },
  {
    airbillNo: 'LSO-2026-004498',
    status: 'In Transit',
    service: 'LSO Economy Next Day™',
    fromName: 'Andy Lee',
    fromCity: 'Dallas', fromState: 'TX', fromZip: '75201',
    toName: 'Mike Chen',
    toCity: 'Houston', toState: 'TX', toZip: '77001',
    weight: '12.0', pieces: 3, declaredValue: '500.00',
    createdDate: '2026-03-27', deliveryDate: '',
  },
  {
    airbillNo: 'LSO-2026-004465',
    status: 'Delivered',
    service: 'LSO Ground™',
    fromName: 'Andy Lee',
    fromCity: 'Dallas', fromState: 'TX', fromZip: '75201',
    toName: 'Lisa Wang',
    toCity: 'Plano', toState: 'TX', toZip: '75024',
    weight: '3.5', pieces: 1, declaredValue: '100.00',
    createdDate: '2026-03-20', deliveryDate: '2026-03-23',
  },
  {
    airbillNo: 'LSO-2026-004430',
    status: 'Cancelled',
    service: 'LSO 2nd Day™',
    fromName: 'Andy Lee',
    fromCity: 'Dallas', fromState: 'TX', fromZip: '75201',
    toName: 'John Davis',
    toCity: 'San Antonio', toState: 'TX', toZip: '78201',
    weight: '8.0', pieces: 2, declaredValue: '350.00',
    createdDate: '2026-03-18', deliveryDate: '',
  },
  {
    airbillNo: 'LSO-2026-004412',
    status: 'Pending',
    service: 'LSO E-Commerce Delivery™',
    fromName: 'Andy Lee',
    fromCity: 'Dallas', fromState: 'TX', fromZip: '75201',
    toName: 'Emily Brown',
    toCity: 'Fort Worth', toState: 'TX', toZip: '76102',
    weight: '1.5', pieces: 1, declaredValue: '75.00',
    createdDate: '2026-03-28', deliveryDate: '',
  },
  {
    airbillNo: 'LSO-2026-004389',
    status: 'Delivered',
    service: 'LSO Early Next Day™',
    fromName: 'Andy Lee',
    fromCity: 'Dallas', fromState: 'TX', fromZip: '75201',
    toName: 'Andy Johnson',
    toCity: 'Dallas', toState: 'TX', toZip: '75050',
    weight: '0.5', pieces: 1, declaredValue: '50.00',
    createdDate: '2026-03-15', deliveryDate: '2026-03-16',
  },
];

type FilterStatus = 'All' | 'In Transit' | 'Delivered' | 'Pending' | 'Cancelled';

const ManageShipment: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'airbillNo' | 'createdDate' | 'status'>('createdDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = mockShipments
    .filter(s => filter === 'All' || s.status === filter)
    .filter(s => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return s.airbillNo.toLowerCase().includes(q) || s.toName.toLowerCase().includes(q) || s.fromName.toLowerCase().includes(q) || s.toCity.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'airbillNo') cmp = a.airbillNo.localeCompare(b.airbillNo);
      else if (sortField === 'createdDate') cmp = a.createdDate.localeCompare(b.createdDate);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const counts = {
    all: mockShipments.length,
    inTransit: mockShipments.filter(s => s.status === 'In Transit').length,
    delivered: mockShipments.filter(s => s.status === 'Delivered').length,
    pending: mockShipments.filter(s => s.status === 'Pending').length,
    cancelled: mockShipments.filter(s => s.status === 'Cancelled').length,
  };

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const statusClass = (s: string) => {
    switch (s) {
      case 'Delivered': return 'status-delivered';
      case 'In Transit': return 'status-transit';
      case 'Pending': return 'status-pending';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const formatDate = (d: string) => {
    if (!d) return '—';
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="manage-shipment-page">
      <div className="ms-header">
        <div className="ms-title-row">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M1 12L5 4h14l4 8" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 12h22v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6z" stroke="#003087" strokeWidth="2"/>
          </svg>
          <h1>Manage Shipments</h1>
        </div>
        <p className="ms-subtitle">View, track, and manage all your shipments. You can also <a href="/dashboard/ship-with-account" className="ms-link" onClick={(e) => { e.preventDefault(); navigate('/dashboard/ship-with-account'); }}>create a new shipment</a>.</p>
      </div>

      {/* Status Cards */}
      <div className="ms-status-cards">
        <button className={`ms-card ${filter === 'All' ? 'ms-card-active' : ''}`} onClick={() => setFilter('All')}>
          <span className="ms-card-count">{counts.all}</span>
          <span className="ms-card-label">ALL</span>
        </button>
        <button className={`ms-card ${filter === 'In Transit' ? 'ms-card-active' : ''}`} onClick={() => setFilter('In Transit')}>
          <span className="ms-card-count ms-count-transit">{counts.inTransit}</span>
          <span className="ms-card-label">IN TRANSIT</span>
        </button>
        <button className={`ms-card ${filter === 'Delivered' ? 'ms-card-active' : ''}`} onClick={() => setFilter('Delivered')}>
          <span className="ms-card-count ms-count-delivered">{counts.delivered}</span>
          <span className="ms-card-label">DELIVERED</span>
        </button>
        <button className={`ms-card ${filter === 'Pending' ? 'ms-card-active' : ''}`} onClick={() => setFilter('Pending')}>
          <span className="ms-card-count ms-count-pending">{counts.pending}</span>
          <span className="ms-card-label">PENDING</span>
        </button>
        <button className={`ms-card ${filter === 'Cancelled' ? 'ms-card-active' : ''}`} onClick={() => setFilter('Cancelled')}>
          <span className="ms-card-count ms-count-cancelled">{counts.cancelled}</span>
          <span className="ms-card-label">CANCELLED</span>
        </button>
      </div>

      {/* Search + Create */}
      <div className="ms-toolbar">
        <div className="ms-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#999" strokeWidth="2"/></svg>
          <input type="text" placeholder="Search by airbill #, name, address..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="ms-create-btn" onClick={() => navigate('/dashboard/ship-with-account')}>+ Create New Shipment</button>
      </div>

      {/* Table */}
      <div className="ms-table-wrap">
        <table className="ms-table">
          <thead>
            <tr>
              <th className="ms-th-sort" onClick={() => toggleSort('airbillNo')}>AIRBILL NO. {sortField === 'airbillNo' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
              <th className="ms-th-sort" onClick={() => toggleSort('status')}>STATUS {sortField === 'status' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
              <th>SERVICE</th>
              <th>TO</th>
              <th>DESTINATION</th>
              <th>PKGS</th>
              <th>WEIGHT</th>
              <th className="ms-th-sort" onClick={() => toggleSort('createdDate')}>CREATED {sortField === 'createdDate' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
              <th>DELIVERY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.airbillNo}>
                <td><a href="#" className="ms-airbill-link" onClick={(e) => { e.preventDefault(); navigate(`/dashboard/shipment-view/${s.airbillNo}`); }}>{s.airbillNo}</a></td>
                <td><span className={`ms-status ${statusClass(s.status)}`}>{s.status.toUpperCase()}</span></td>
                <td className="ms-td-service">{s.service}</td>
                <td>{s.toName}</td>
                <td>{s.toCity}, {s.toState} {s.toZip}</td>
                <td>{s.pieces}</td>
                <td>{s.weight} lbs</td>
                <td>{formatDate(s.createdDate)}</td>
                <td>{formatDate(s.deliveryDate)}</td>
                <td>
                  <button className="ms-action-btn" title="View details" onClick={() => navigate(`/dashboard/shipment-view/${s.airbillNo}`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={10} className="ms-empty">No shipments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ms-footer-info">Showing {filtered.length} of {mockShipments.length} shipments</div>
    </div>
  );
};

export default ManageShipment;
