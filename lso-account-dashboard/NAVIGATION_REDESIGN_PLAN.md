# LSO Account Dashboard - Navigation Redesign Implementation Plan

## Project Overview
Complete redesign of the dashboard navigation structure and page organization to improve user experience and functionality.

---

## Phase 1: Navigation Structure Update

### 1.1 Top Navigation Bar Component
**File:** `src/components/MainNavigation.tsx` (NEW)

**Requirements:**
- Replace current tab-based navigation with horizontal navigation bar
- 6 main modules: Overview, Claim, Admin, Address book, Report, Billing
- Active state highlighting
- Click navigation support
- Responsive design

**Design Specifications:**
- Background: Dark gray (#4a4a4a) for inactive tabs
- Active tab: Blue (#003087)
- Font: 17px, weight 600
- Border radius: 8px on top corners
- Smooth transitions

**Tasks:**
- [ ] Create MainNavigation component
- [ ] Add navigation state management
- [ ] Implement active tab highlighting
- [ ] Add click handlers for each module
- [ ] Style according to specifications
- [ ] Make responsive for mobile

---

## Phase 2: Overview Page Redesign

### 2.1 Tracking Search Section
**Location:** Top of Overview page

**Requirements:**
- Prominent search box at the top
- Support batch query up to 30 tracking numbers
- Placeholder text: "Enter up to 30 tracking numbers, separated by commas"
- Clean, user-friendly interface
- Search button with icon

**Tasks:**
- [ ] Create tracking search input component
- [ ] Add validation for 30 tracking number limit
- [ ] Implement comma-separated parsing
- [ ] Add search button with loading state
- [ ] Style for optimal UX

### 2.2 Tracking Results List
**Requirements:**
- Reuse existing tracking results display from TrackPackage
- Modifications needed:
  - Change "Signed" to "Delivered time"
  - Hide "Delivered time" if status is not "Delivered"
  - Remove delete icon/functionality
  - Keep all other features (filter, export, pagination)

**Tasks:**
- [ ] Extract tracking results component for reuse
- [ ] Update label from "Signed" to "Delivered time"
- [ ] Add conditional rendering for Delivered time
- [ ] Remove delete button and handler
- [ ] Test with various statuses

### 2.3 Quick Action Cards
**Requirements:**
- Merge "Your Tracking" and "Your Shipments" sections
- Remove section titles
- Display as action cards in friendly layout
- Cards should include:
  - Create Shipment → Ship With Account page
  - Schedule Pickup → Schedule Pickup page
  - Calculate Rates → Calculate Rates page
  - Track Package → Tracking search (scroll to top)

**Tasks:**
- [ ] Design action card component
- [ ] Create grid layout for cards
- [ ] Add icons for each action
- [ ] Implement navigation handlers
- [ ] Style for visual appeal

### 2.4 Shipment Details Page Redesign
**Requirements:**
- Single-screen layout (no scrolling needed)
- Display all information in one view
- Add action buttons:
  - Create Shipment → Ship With Account
  - Schedule Pickup → Schedule Pickup page
  - Manage Pickup → Cancel Scheduled Pickup page
  - Rate → Calculate Rates page
- Reorganize information sections
- Use full width efficiently

**Current Sections to Display:**
- Package Info (Create Time, Billing Ref, Dimensions, Weight)
- Tracking History (timeline view)
- Sender Info (Name, Address)
- Receiver Info (Name, Address)
- Proof of Delivery (Delivery Date, Signed by)

**Tasks:**
- [ ] Create new ShipmentDetail layout component
- [ ] Design single-screen grid layout
- [ ] Add action button bar at top
- [ ] Reorganize information sections
- [ ] Implement responsive design
- [ ] Add navigation handlers for action buttons
- [ ] Test with various screen sizes

---

## Phase 3: Claim Page

### 3.1 Claims Display
**Requirements:**
- Show "Your claims" section content
- Display claim form availability
- "Click for New Claim Link" button
- Claim options expandable section

**Tasks:**
- [ ] Create Claim page component
- [ ] Integrate existing claim content
- [ ] Add claim form link functionality
- [ ] Style according to existing design
- [ ] Test claim submission flow

---

## Phase 4: Admin Page

### 4.1 User Management Interface
**Requirements:**
- Display "Add additional user" form
- Support for admin users to:
  - Add new users
  - Edit existing users
  - Manage customer/company information
  - Set user permissions
- User-friendly interface with clear actions

**Form Fields:**
- User Information: Login/Username, First Name, Last Name, Email, Password
- Company Information: Account Number, Company Name, Phone, Address, City, State, Zip
- Permissions: Billing Reference Required, User Admin, Show only user shipment, etc.

**Tasks:**
- [ ] Create Admin page component
- [ ] Build user management form
- [ ] Add user list/table view
- [ ] Implement CRUD operations
- [ ] Add permission management
- [ ] Create confirmation dialogs
- [ ] Add validation
- [ ] Style for professional appearance

---

## Phase 5: Address Book Page

### 5.1 Address Management
**Requirements:**
- Full CRUD operations (Create, Read, Update, Delete)
- Address list view with search
- Add new address form
- Edit address functionality
- Delete with confirmation
- Integration with Ship With Account for quick selection

**Address Fields:**
- Name/Company
- Address Line 1
- Address Line 2
- City
- State
- Zip Code
- Country
- Phone Number
- Address Type (Residential/Commercial)

**Tasks:**
- [ ] Create AddressBook page component
- [ ] Build address list view with search
- [ ] Create add address form/modal
- [ ] Implement edit functionality
- [ ] Add delete with confirmation
- [ ] Create address selection component for Ship With Account
- [ ] Add address validation
- [ ] Implement local storage or API integration
- [ ] Style for easy navigation

---

## Phase 6: Report Page

### 6.1 Report Integration
**Requirements:**
- Reuse existing Report functionality from TrackPackage
- Keep all current features:
  - Date range selection
  - Run Report button
  - Report results display
  - Export CSV functionality
  - Print functionality
- No changes to layout or interactions

**Tasks:**
- [ ] Extract Report component from TrackPackage
- [ ] Create standalone Report page
- [ ] Ensure all functionality works
- [ ] Test date selection and report generation
- [ ] Verify export and print features

---

## Phase 7: Billing Page

### 7.1 Coming Soon Placeholder
**Requirements:**
- Friendly "Coming Soon" message
- Professional placeholder design
- Optional: Hide navigation item or show disabled state

**Design Options:**
1. Show page with "Coming Soon" message
2. Hide Billing from navigation temporarily
3. Show disabled state in navigation

**Tasks:**
- [ ] Create Billing placeholder page
- [ ] Design coming soon message
- [ ] Add relevant icon/illustration
- [ ] Decide on navigation visibility
- [ ] Style professionally

---

## Phase 8: Routing and Navigation

### 8.1 Update App Routing
**File:** `src/App.tsx`

**New Routes:**
- `/` or `/overview` → Overview Page
- `/claim` → Claim Page
- `/admin` → Admin Page
- `/address-book` → Address Book Page
- `/report` → Report Page
- `/billing` → Billing Page (Coming Soon)
- `/shipment/:id` → Shipment Details Page
- `/ship` → Ship With Account (existing)
- `/calculate-rates` → Calculate Rates (existing)
- `/schedule-pickup` → Schedule Pickup (existing)
- `/manage-pickup` → Cancel Pickup (existing)

**Tasks:**
- [ ] Update React Router configuration
- [ ] Add new route definitions
- [ ] Update navigation handlers
- [ ] Test all navigation paths
- [ ] Add 404 page handling

---

## Phase 9: Component Refactoring

### 9.1 Shared Components
**Components to Extract/Create:**
- TrackingResultsList (reusable)
- ActionCard (for Overview quick actions)
- AddressSelector (for Ship With Account integration)
- UserForm (for Admin page)
- ConfirmDialog (for delete confirmations)

**Tasks:**
- [ ] Identify reusable components
- [ ] Extract from existing pages
- [ ] Create new shared components
- [ ] Document component APIs
- [ ] Add prop types/interfaces

---

## Phase 10: Testing and Quality Assurance

### 10.1 Functional Testing
**Test Cases:**
- [ ] Navigation between all modules works
- [ ] Overview tracking search (1-30 numbers)
- [ ] Tracking results display correctly
- [ ] Shipment details shows all info in one screen
- [ ] Action buttons navigate correctly
- [ ] Claim page displays and functions
- [ ] Admin user management CRUD operations
- [ ] Address book CRUD operations
- [ ] Address selection in Ship With Account
- [ ] Report generation and export
- [ ] Billing placeholder displays

### 10.2 UI/UX Testing
- [ ] Responsive design on mobile
- [ ] Responsive design on tablet
- [ ] Desktop layout optimization
- [ ] Navigation highlighting works
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly
- [ ] Confirmation dialogs work properly

### 10.3 Performance Testing
- [ ] Page load times acceptable
- [ ] Large tracking result sets (50+) perform well
- [ ] Address book with many addresses
- [ ] Report generation with large date ranges

---

## Implementation Timeline Estimate

### Week 1: Foundation
- Phase 1: Navigation Structure (2 days)
- Phase 2.1-2.2: Overview Search & Results (3 days)

### Week 2: Overview & Claim
- Phase 2.3-2.4: Quick Actions & Shipment Details (3 days)
- Phase 3: Claim Page (2 days)

### Week 3: Admin & Address Book
- Phase 4: Admin Page (3 days)
- Phase 5: Address Book (2 days)

### Week 4: Integration & Testing
- Phase 6: Report Page (1 day)
- Phase 7: Billing Placeholder (0.5 day)
- Phase 8: Routing (1 day)
- Phase 9: Component Refactoring (1.5 days)
- Phase 10: Testing & QA (1 day)

**Total Estimated Time: 4 weeks**

---

## Technical Considerations

### State Management
- Consider using Context API or Redux for:
  - Current user information
  - Navigation state
  - Address book data
  - User management data

### API Integration Points
- Tracking search
- Claim submission
- User management (CRUD)
- Address book (CRUD)
- Report generation

### Data Models Needed
```typescript
interface Address {
  id: string;
  name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  type: 'residential' | 'commercial';
}

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  companyName: string;
  permissions: UserPermissions;
  active: boolean;
}

interface UserPermissions {
  billingRefRequired: boolean;
  isAdmin: boolean;
  showOnlyUserShipment: boolean;
  disableBillingRefRequired: boolean;
}
```

---

## File Structure

```
src/
├── components/
│   ├── MainNavigation.tsx (NEW)
│   ├── MainNavigation.css (NEW)
│   ├── TrackingResultsList.tsx (EXTRACTED)
│   ├── ActionCard.tsx (NEW)
│   ├── AddressSelector.tsx (NEW)
│   ├── UserForm.tsx (NEW)
│   ├── ConfirmDialog.tsx (NEW)
│   └── ... (existing components)
├── pages/
│   ├── Overview.tsx (NEW)
│   ├── Overview.css (NEW)
│   ├── Claim.tsx (NEW)
│   ├── Claim.css (NEW)
│   ├── Admin.tsx (NEW)
│   ├── Admin.css (NEW)
│   ├── AddressBook.tsx (UPDATED)
│   ├── AddressBook.css (UPDATED)
│   ├── Report.tsx (NEW - extracted from TrackPackage)
│   ├── Report.css (NEW)
│   ├── Billing.tsx (NEW)
│   ├── Billing.css (NEW)
│   ├── ShipmentDetail.tsx (REDESIGNED)
│   ├── ShipmentDetail.css (REDESIGNED)
│   └── ... (existing pages)
├── types/
│   ├── address.ts (NEW)
│   ├── user.ts (NEW)
│   └── ... (existing types)
└── App.tsx (UPDATED)
```

---

## Priority Order for Implementation

### High Priority (Must Have)
1. Navigation structure
2. Overview page with tracking search
3. Shipment details redesign
4. Address book functionality

### Medium Priority (Should Have)
5. Admin page
6. Claim page
7. Report page extraction

### Low Priority (Nice to Have)
8. Billing placeholder
9. Advanced animations
10. Additional polish

---

## Success Criteria

✅ All 6 navigation modules are accessible and functional
✅ Overview page provides intuitive tracking search (up to 30 numbers)
✅ Tracking results display correctly with updated labels
✅ Shipment details fit in one screen without scrolling
✅ Admin users can manage users and permissions
✅ Users can manage their address book
✅ Address book integrates with Ship With Account
✅ Report functionality works as before
✅ All pages are responsive
✅ Navigation is intuitive and user-friendly
✅ No broken links or navigation paths

---

## Notes and Considerations

1. **Backward Compatibility**: Ensure existing bookmarks/links still work
2. **User Permissions**: Admin page should check user permissions
3. **Data Persistence**: Address book and user data need proper storage
4. **Error Handling**: All forms need validation and error messages
5. **Loading States**: Show loading indicators for async operations
6. **Mobile Experience**: Ensure all features work well on mobile devices
7. **Accessibility**: Maintain WCAG compliance throughout
8. **Performance**: Optimize for large datasets (addresses, users, tracking results)

---

## Next Steps

1. Review and approve this implementation plan
2. Set up project timeline and milestones
3. Begin Phase 1: Navigation Structure
4. Regular check-ins and progress reviews
5. Iterative testing and refinement

---

**Document Version:** 1.0
**Created:** 2026-02-27
**Last Updated:** 2026-02-27
