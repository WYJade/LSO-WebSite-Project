import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ShipmentView.css';

const mockData: Record<string, any> = {
  'LSO-2026-004521': {
    airbillNo: 'LSO-2026-004521', status: 'Delivered', service: 'LSO Priority Next Day™',
    from: { name: 'Andy Lee', phone: '8885295192', company: 'LSO', address1: '200 APACHE TRAIL', address2: '', residential: false, country: 'United States', city: 'DALLAS', state: 'TX', zip: '75201' },
    to: { name: 'Sarah Miller', phone: '5125550198', company: 'TechCorp', address1: '789 Oak Avenue', address2: 'Suite 100', residential: true, country: 'United States', city: 'AUSTIN', state: 'TX', zip: '78754' },
    weight: '5.2', pieces: 2, declaredValue: '250.00', dimL: '12', dimW: '10', dimH: '8',
    billingRef1: 'PO-2026-001', billingRef2: '', billingRef3: '', billingRef4: '',
    signatureReq: 'None', releaseSignature: false, deliveryNotification: true, deliveryNotificationEmail: 'sarah@techcorp.com',
    emailNotifications: 'Delivery', returnLabels: '0', handlingFee: '0', poNumber: '', promotionCode: '', lsoPickup: false, thirdPartyBilling: '',
    createdDate: '2026-03-25', deliveryDate: '2026-03-26',
    basePrice: 9.67, serviceCharge: 0, insuranceCharge: 0, fuelSurcharge: 1.62, totalCharge: 11.29,
  },
  'LSO-2026-004498': {
    airbillNo: 'LSO-2026-004498', status: 'In Transit', service: 'LSO Economy Next Day™',
    from: { name: 'Andy Lee', phone: '8885295192', company: 'LSO', address1: '200 APACHE TRAIL', address2: '', residential: false, country: 'United States', city: 'DALLAS', state: 'TX', zip: '75201' },
    to: { name: 'Mike Chen', phone: '7135550234', company: 'GlobalShip', address1: '456 Commerce Blvd', address2: '', residential: false, country: 'United States', city: 'HOUSTON', state: 'TX', zip: '77001' },
    weight: '12.0', pieces: 3, declaredValue: '500.00', dimL: '18', dimW: '14', dimH: '12',
    billingRef1: '', billingRef2: '', billingRef3: '', billingRef4: '',
    signatureReq: 'General', releaseSignature: false, deliveryNotification: false, deliveryNotificationEmail: '',
    emailNotifications: '', returnLabels: '0', handlingFee: '0', poNumber: 'PO-5567', promotionCode: '', lsoPickup: true, thirdPartyBilling: '',
    createdDate: '2026-03-27', deliveryDate: '',
    basePrice: 22.32, serviceCharge: 0, insuranceCharge: 0, fuelSurcharge: 3.75, totalCharge: 26.07,
  },
};

const ShipmentView: React.FC = () => {
  const { airbillNo } = useParams<{ airbillNo: string }>();
  const navigate = useNavigate();
  const d = airbillNo ? mockData[airbillNo] : null;

  if (!d) {
    return (
      <div className="sv-page">
        <div className="sv-not-found">
          <h2>Shipment Not Found</h2>
          <p>Airbill #{airbillNo} was not found.</p>
          <button className="sv-back-btn" onClick={() => navigate('/dashboard/manage-shipment')}>← Back to Manage Shipments</button>
        </div>
      </div>
    );
  }

  const statusClass = (s: string) => {
    switch (s) { case 'Delivered': return 'sv-delivered'; case 'In Transit': return 'sv-transit'; case 'Pending': return 'sv-pending'; case 'Cancelled': return 'sv-cancelled'; default: return ''; }
  };

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="sv-row"><span className="sv-label">{label}</span><span className="sv-value">{value}</span></div>
  );

  return (
    <div className="sv-page">
      <button className="sv-back-btn" onClick={() => navigate('/dashboard/manage-shipment')}>← Back to Manage Shipments</button>
      <div className="sv-header">
        <h1>Airbill: {d.airbillNo}</h1>
        <span className={`sv-status ${statusClass(d.status)}`}>{d.status.toUpperCase()}</span>
      </div>

      {/* From */}
      <div className="sv-section">
        <div className="sv-section-head"><span className="sv-badge">From</span></div>
        <div className="sv-details">
          <Row label="Name" value={d.from.name} />
          <Row label="Phone" value={d.from.phone} />
          <Row label="Company" value={d.from.company} />
          <Row label="Address 1" value={d.from.address1} />
          <Row label="Address 2" value={d.from.address2} />
          <Row label="Residential Address" value={d.from.residential ? 'Yes' : 'No'} />
          <Row label="Country" value={d.from.country} />
          <Row label="City" value={d.from.city} />
          <Row label="State" value={d.from.state} />
          <Row label="Zip code" value={d.from.zip} />
        </div>
      </div>

      {/* Airbill 1 - To + Shipment details */}
      <div className="sv-section">
        <div className="sv-section-head"><span className="sv-badge-airbill">Airbill 1</span></div>
        <div className="sv-badge-to-inline">To</div>
        <div className="sv-2col">
          <div className="sv-col">
            <Row label="Name" value={d.to.name} />
            <Row label="Company" value={d.to.company} />
            <Row label="Address 1" value={d.to.address1} />
            <Row label="Address 2" value={d.to.address2} />
            <Row label="Phone" value={d.to.phone} />
            <Row label="Country" value={d.to.country} />
            <Row label="Zip code" value={d.to.zip} />
            <Row label="City" value={d.to.city} />
            <Row label="State" value={d.to.state} />
            <Row label="Residential Address" value={d.to.residential ? 'Yes' : 'No'} />
          </div>
          <div className="sv-col">
            <Row label="Service selected" value={d.service} />
            <Row label="Weight (lbs.)" value={d.weight} />
            <Row label="Declared value" value={`$${d.declaredValue}`} />
            <Row label="Dimensions" value={`${d.dimL} x ${d.dimW} x ${d.dimH} in.`} />
            <Row label="Estimate base price" value={`$${d.basePrice.toFixed(2)}`} />
            <Row label="Estimated service charge" value={`$${d.serviceCharge.toFixed(2)}`} />
            <Row label="Estimated additional insurance charge" value={`$${d.insuranceCharge.toFixed(2)}`} />
            <Row label="Estimated fuel surcharge" value={`$${d.fuelSurcharge.toFixed(2)}`} />
            <Row label="Estimated total charge" value={`$${d.totalCharge.toFixed(2)}`} />
          </div>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="sv-section">
        <div className="sv-2col">
          <div className="sv-col">
            <Row label="Billing Reference 1" value={d.billingRef1} />
            <Row label="Billing Reference 2" value={d.billingRef2} />
            <Row label="Billing Reference 3" value={d.billingRef3} />
            <Row label="Billing Reference 4" value={d.billingRef4} />
            <Row label="Signature Requirement" value={d.signatureReq} />
            <Row label="Release Signature" value={d.releaseSignature ? 'Yes' : 'No'} />
            <Row label="Delivery Notification" value={d.deliveryNotification ? 'Yes' : 'No'} />
          </div>
          <div className="sv-col">
            <Row label="Delivery Notification Email" value={d.deliveryNotificationEmail} />
            <Row label="Email Notifications" value={d.emailNotifications} />
            <Row label="Return labels" value={d.returnLabels} />
            <Row label="Handling Fee" value={`$${parseFloat(d.handlingFee || '0').toFixed(2)}`} />
            <Row label="PO #" value={d.poNumber} />
            <Row label="Promotion Code" value={d.promotionCode} />
            <Row label="LSO Pickup" value={d.lsoPickup ? 'Yes' : 'No'} />
            <Row label="3rd Party Billing" value={d.thirdPartyBilling} />
          </div>
        </div>
      </div>

      <div className="sv-actions">
        <button className="sv-btn-outline" onClick={() => navigate('/dashboard/manage-shipment')}>Back to list</button>
        <button className="sv-btn-primary" onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
};

export default ShipmentView;
