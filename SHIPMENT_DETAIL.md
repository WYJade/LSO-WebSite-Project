# Shipment Detail View

## Overview
A comprehensive shipment detail page that displays complete tracking information, shipment details, and tracking history when clicking on any shipment card in the tracking results.

## Access
**Trigger**: Click anywhere on a tracking result card in the "My Shipments" list

## Features

### 1. Navigation
- **Back to List Button**: Returns to the tracking results list
  - Located in the header with left arrow icon
  - Hover effect with blue highlight and slide animation
  - Keyboard accessible

### 2. Tracking Number Header
- Large, prominent tracking number display (#XXXXXXXX format)
- Gradient blue background (LSO brand colors)
- Status badges:
  - Current tracking status (New, Picked Up, Delivered, etc.)
  - Service type (LSO Ground™, eCommerce delivery)
- White text on blue background for high contrast

### 3. Shipment Information Grid
Four-section grid layout with detailed information:

#### Section 1: Shipment Information
- Airbill Number
- Tracking Status
- Delivery Date
- Signed by
- Service Type
- Weight

#### Section 2: Delivery Address
- Full delivery address with location pin icon (📍)
- Street address, city, state, and ZIP code
- Clean white box with border

#### Section 3: Sender Information
- Sender name with user icon (👤)
- Origin city
- Contact information display

#### Section 4: Receiver Information
- Receiver name with user icon (👤)
- Destination city
- Contact information display

### 4. Tracking History Table
- **Three-column layout**:
  - Status: Event description (bold, blue text)
  - Date: Timestamp of event
  - Location: City where event occurred
- **Header**: Dark blue background with white text
- **Rows**: 
  - White background with light borders
  - Hover effect (light blue background)
  - Chronological order from oldest to newest
- **Events include**:
  - Data Transmitted
  - Picked Up
  - Inbound scan at destination
  - Current status (Delivered, Out for Delivery, etc.)

### 5. Action Buttons
Two prominent action buttons at the bottom:

#### Track Another (Secondary)
- White background with gray border
- Hover: Blue border and background
- Returns to tracking list

#### Print Details (Primary)
- Blue gradient background
- Print icon (📄)
- Hover: Darker blue with elevation
- Triggers browser print dialog

## Design Features

### Visual Hierarchy
- Large tracking number as focal point
- Color-coded status badges
- Organized information sections
- Clear table structure for history

### Color Scheme
- Primary Blue: #003087 (LSO brand)
- Gradient: #003087 to #0052cc
- Background: #f8f9fa (light gray)
- Text: #333 (dark gray)
- Borders: #e0e0e0 (light gray)

### Typography
- Tracking Number: 48px, bold, letter-spacing
- Section Titles: 18px, bold, blue
- Labels: 14px, medium weight
- Values: 15px, semi-bold

### Spacing & Layout
- Generous padding (30-40px)
- Consistent gaps (15-30px)
- Rounded corners (8-12px)
- Clean borders and dividers

### Animations
- Fade-in on page load (0.3s)
- Hover effects on buttons
- Smooth transitions on all interactive elements
- Back button slide animation

## Responsive Design

### Mobile Adaptations
- Grid changes to single column
- Tracking number size reduces to 32px
- Table columns stack vertically
- Buttons become full-width
- Touch-friendly button sizes (min 44px)

### Tablet
- Two-column grid maintained
- Adjusted spacing for medium screens
- Optimized table layout

## User Experience

### Interaction Flow
1. User clicks on tracking card
2. Smooth transition to detail view
3. All information displayed at once
4. Easy navigation back to list
5. Print option for record keeping

### Accessibility
- High contrast text and backgrounds
- Clear visual hierarchy
- Keyboard navigation support
- Screen reader friendly labels
- Touch-friendly interactive elements

### Information Architecture
- Most important info at top (tracking number, status)
- Grouped related information
- Chronological tracking history
- Clear action buttons at bottom

## Technical Implementation

### State Management
```typescript
const [showDetailView, setShowDetailView] = useState(false);
const [selectedShipment, setSelectedShipment] = useState<any>(null);
```

### Key Functions
- `handleViewShipmentDetail(shipment)`: Opens detail view with shipment data
- `handleBackToList()`: Returns to tracking results list
- Generates detailed tracking history automatically
- Creates mock delivery address and weight data

### Data Structure
```typescript
{
  trackingNumber: string,
  type: string,
  signTime: string,
  fromCity: string,
  toCity: string,
  sender: string,
  receiver: string,
  status: string,
  trackingHistory: Array<{
    status: string,
    date: string,
    location: string
  }>,
  deliveryAddress: string,
  weight: string,
  serviceType: string
}
```

## Files Modified
- `lso-account-dashboard/src/pages/TrackPackage.tsx` - Component logic
- `lso-account-dashboard/src/pages/TrackPackage.css` - Styles

## Testing Checklist
✅ Click on tracking card opens detail view
✅ Back button returns to list
✅ All shipment information displays correctly
✅ Tracking history shows in correct order
✅ Status badges display with correct colors
✅ Print button triggers print dialog
✅ Hover effects work on all interactive elements
✅ Mobile responsive layout works
✅ Smooth animations and transitions
✅ Build completes successfully

## Future Enhancements
- Add barcode/QR code for tracking number
- Include map view of shipment route
- Add estimated delivery time
- Include package photos
- Add signature image for delivered packages
- Export individual shipment details
- Share tracking link functionality
- Add notes/comments section
