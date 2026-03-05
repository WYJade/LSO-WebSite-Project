# Design Document: Sidebar Navigation Redesign

## Overview

This design document outlines the technical approach for redesigning the LSO Account Dashboard from a traditional tab-based layout to a modern left sidebar navigation pattern. The redesign will create a new `Sidebar` component, refactor the `Dashboard` container to support the new layout structure, and adapt all existing page components to render within a dedicated content area.

The key architectural change involves moving from a module-switching pattern (where `Dashboard.tsx` conditionally renders components based on active tab) to a route-based pattern where the sidebar triggers navigation and React Router handles component rendering. This approach provides better URL management, browser history support, and cleaner separation of concerns.

## Architecture

### High-Level Structure

```
┌─────────────────────────────────────────────────────────┐
│                    NavigationBar                         │
├──────────────┬──────────────────────────────────────────┤
│              │                                           │
│   Sidebar    │         Content Area                      │
│   (Fixed)    │         (Scrollable)                      │
│              │                                           │
│  - Overview  │    ┌──────────────────────────────┐     │
│    ▼         │    │                              │     │
│    • Track   │    │   Active Page Component      │     │
│    • Create  │    │   (Overview, Reports, etc.)  │     │
│    • Schedule│    │                              │     │
│    • Manage  │    │                              │     │
│    • Rate    │    │                              │     │
│    • Prefs   │    │                              │     │
│  - Claim     │    │                              │     │
│  - Admin     │    │                              │     │
│  - Address   │    └──────────────────────────────┘     │
│  - Report    │                                           │
│  - Billing   │                                           │
│              │                                           │
└──────────────┴───────────────────────────────────────────┘
│                        Footer                            │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── BrowserRouter
    └── Routes
        ├── Route "/" → DashboardLayout
        │   ├── NavigationBar
        │   ├── Sidebar
        │   └── Outlet (Content Area)
        │       ├── Route "/overview" → Overview
        │       ├── Route "/tracking" → TrackPackage
        │       ├── Route "/ship-with-account" → ShipWithAccount
        │       ├── Route "/schedule-pickup" → SchedulePickup
        │       ├── Route "/cancel-pickup" → CancelPickup
        │       ├── Route "/calculate-rates" → CalculateRates
        │       ├── Route "/preferences" → Preferences
        │       ├── Route "/claim" → Claim
        │       ├── Route "/admin" → UserManagement
        │       ├── Route "/address-book" → AddressBook
        │       ├── Route "/reports" → Reports
        │       └── Route "/billing" → Billing
        └── Footer
```

### Routing Strategy

The application will transition from a single-route Dashboard that switches content internally to a nested routing structure:

**Current Pattern:**
- Single route: `/` renders Dashboard
- Dashboard internally switches between modules
- No URL changes when switching tabs
- Browser back/forward doesn't work for navigation

**New Pattern:**
- Parent route: `/` renders DashboardLayout (with Sidebar)
- Child routes: `/overview`, `/claim`, `/reports`, etc.
- Each navigation updates the URL
- Browser back/forward works naturally
- Direct URL access works for all pages

## Components and Interfaces

### 1. DashboardLayout Component

**Purpose:** Container component that provides the overall layout structure with NavigationBar, Sidebar, and content area.

**Props:**
```typescript
interface DashboardLayoutProps {
  currentUser: User;
}
```

**Responsibilities:**
- Render NavigationBar at the top
- Render Sidebar on the left
- Provide content area using React Router's `<Outlet />`
- Manage layout-level state (sidebar collapse state)
- Pass user context to child components

**Structure:**
```tsx
<div className="dashboard-layout">
  <NavigationBar {...navProps} />
  <div className="dashboard-body">
    <Sidebar currentUser={currentUser} />
    <main className="content-area">
      <Outlet />
    </main>
  </div>
  <Footer />
</div>
```

### 2. Sidebar Component

**Purpose:** Fixed-position navigation panel that displays menu items and handles navigation.

**Props:**
```typescript
interface SidebarProps {
  currentUser: User;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}
```

**State:**
```typescript
interface SidebarState {
  expandedMenus: Set<string>; // IDs of expanded menu items
  activeItem: string; // ID of currently active menu item
}
```

**Menu Configuration:**
```typescript
const menuItems: MenuItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/overview',
    icon: <OverviewIcon />,
    submenu: [
      { id: 'track', label: 'Track Your Shipments', path: '/tracking' },
      { id: 'create', label: 'Create Shipment', path: '/ship-with-account' },
      { id: 'schedule', label: 'Schedule Pickup', path: '/schedule-pickup' },
      { id: 'manage', label: 'Manage Pickup', path: '/cancel-pickup' },
      { id: 'rate', label: 'Rate', path: '/calculate-rates' },
      { id: 'preferences', label: 'Your Preferences', path: '/preferences' },
    ],
  },
  { id: 'claim', label: 'Claim', path: '/claim', icon: <ClaimIcon /> },
  { id: 'admin', label: 'Admin', path: '/admin', icon: <AdminIcon /> },
  { id: 'address-book', label: 'Address book', path: '/address-book', icon: <AddressIcon /> },
  { id: 'report', label: 'Report', path: '/reports', icon: <ReportIcon /> },
  { id: 'billing', label: 'Billing', path: '/billing', icon: <BillingIcon /> },
];
```

**Key Methods:**
- `handleMenuClick(menuItem: MenuItem)`: Toggle submenu or navigate to page
- `handleSubmenuClick(path: string)`: Navigate to submenu page
- `isActive(path: string)`: Determine if menu item should be highlighted
- `shouldExpand(menuId: string)`: Determine if menu should be expanded based on current route

**Behavior:**
- Use `useLocation()` hook to track current route
- Use `useNavigate()` hook for programmatic navigation
- Automatically expand parent menu when on a submenu page
- Persist expanded state in session storage
- Provide smooth expand/collapse animations

### 3. Updated Dashboard Component

The existing `Dashboard.tsx` will be refactored into `DashboardLayout.tsx`. The old module-switching logic will be removed since routing now handles component rendering.

**Changes:**
- Remove `activeModule` state
- Remove `renderModuleContent()` method
- Remove `MainNavigation` component
- Remove `WelcomeHeader` component
- Add `<Outlet />` for nested routes
- Simplify to layout-only responsibilities

### 4. Page Component Adaptations

All existing page components will be adapted to work within the content area:

**Overview.tsx:**
- Remove any duplicate navigation elements
- Ensure proper spacing for sidebar layout
- Maintain all existing functionality
- Remove dependency on `onNavigate` prop (use `useNavigate` hook instead)

**Other Pages (Reports, Billing, Claim, etc.):**
- Wrap content in consistent container with padding
- Remove any WelcomeHeader references
- Ensure responsive width handling
- Maintain all existing functionality

**Common Wrapper Pattern:**
```tsx
const PageComponent: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Page Title</h1>
      </div>
      <div className="page-content">
        {/* Existing page content */}
      </div>
    </div>
  );
};
```

### 5. Routing Configuration

**Updated App.tsx:**
```tsx
<Routes>
  <Route path="/" element={<DashboardLayout currentUser={currentUser} />}>
    <Route index element={<Navigate to="/overview" replace />} />
    <Route path="overview" element={<Overview />} />
    <Route path="tracking" element={<TrackPackage />} />
    <Route path="ship-with-account" element={<ShipWithAccount />} />
    <Route path="schedule-pickup" element={<SchedulePickup />} />
    <Route path="cancel-pickup" element={<CancelPickup />} />
    <Route path="calculate-rates" element={<CalculateRates />} />
    <Route path="preferences" element={<Preferences />} />
    <Route path="claim" element={<Claim />} />
    <Route path="admin" element={<UserManagement />} />
    <Route path="address-book" element={<AddressBook />} />
    <Route path="reports" element={<Reports />} />
    <Route path="billing" element={<Billing />} />
    <Route path="shipment-details/:trackingNumber" element={<ShipmentDetails />} />
    <Route path="proof-of-delivery" element={<ProofOfDelivery />} />
  </Route>
  
  {/* Public routes outside dashboard layout */}
  <Route path="/shipping" element={<ShippingPage />} />
  <Route path="/services" element={<ServicesPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="*" element={<Navigate to="/overview" replace />} />
</Routes>
```

## Data Models

### Sidebar State Model

```typescript
interface SidebarState {
  expandedMenus: Set<string>;
  activeItem: string | null;
  isCollapsed: boolean; // For responsive behavior
}
```

### Menu Item Model

```typescript
interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: SubMenuItem[];
  badge?: number; // Optional notification badge
  requiresRole?: UserRole[]; // Optional role-based visibility
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  badge?: number;
}
```

### Navigation Context Model

```typescript
interface NavigationContextValue {
  currentPath: string;
  navigate: (path: string) => void;
  isActive: (path: string) => boolean;
  expandMenu: (menuId: string) => void;
  collapseMenu: (menuId: string) => void;
  toggleMenu: (menuId: string) => void;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Sidebar Menu Highlighting Consistency

*For any* valid route path in the application, exactly one menu item (primary or submenu) in the Sidebar should be highlighted as active, and that menu item's path should match the current route.

**Validates: Requirements 1.7, 1.8, 5.3**

### Property 2: Navigation URL Synchronization

*For any* menu item click in the Sidebar, the browser URL should update to match the menu item's path, and the corresponding page component should render in the content area.

**Validates: Requirements 5.1, 5.4**

### Property 3: Submenu Expansion State Consistency

*For any* route that corresponds to a submenu item, the parent menu (Overview) should be in an expanded state, and when navigating to a non-submenu route, the Overview menu should collapse.

**Validates: Requirements 1.3, 10.1, 10.2**

### Property 4: Browser Navigation Compatibility

*For any* sequence of navigation actions (forward, back, or direct URL access), the Sidebar's active menu item should always reflect the current browser location, and the correct page component should be rendered.

**Validates: Requirements 5.2, 5.3**

### Property 5: Layout Structure Preservation

*For any* page component rendered in the content area, the NavigationBar should remain fixed at the top, the Sidebar should remain fixed on the left, and the Footer should remain at the bottom, regardless of content scrolling.

**Validates: Requirements 2.4, 2.5, 2.6, 11.6**

### Property 6: Component Functionality Preservation

*For any* existing page component (Overview, Reports, Billing, etc.), all interactive elements (buttons, forms, filters, exports) should function identically to their behavior in the old layout.

**Validates: Requirements 3.4, 3.5, 4.6, 4.7**

### Property 7: Routing Path Preservation

*For any* existing route path (e.g., `/tracking`, `/ship-with-account`), the URL should remain unchanged after the redesign, and direct navigation to that URL should render the correct page.

**Validates: Requirements 3.5, 5.4**

### Property 8: Keyboard Navigation Accessibility

*For any* menu item in the Sidebar, pressing Tab should move focus to the next interactive element in logical order, and pressing Enter or Space on a focused menu item should trigger navigation.

**Validates: Requirements 8.1, 8.5, 8.6**

### Property 9: Responsive Width Adaptation

*For any* viewport width, the combined width of the Sidebar and Content Area should equal the available screen width minus margins, and the Content Area should remain usable and scrollable.

**Validates: Requirements 2.7, 7.4**

### Property 10: State Persistence Across Refreshes

*For any* sidebar state (expanded menus, active item), refreshing the page should restore the sidebar to the same state based on the current URL and session storage.

**Validates: Requirements 10.3, 10.5**

## Error Handling

### Navigation Errors

**Invalid Route Handling:**
- When a user navigates to an invalid route, redirect to `/overview`
- Log the invalid route attempt for debugging
- Display a brief toast notification: "Page not found, redirecting to Overview"

**Permission-Based Access:**
- When a user attempts to access a route they don't have permission for (e.g., Admin page without admin role), redirect to `/overview`
- Display a toast notification: "You don't have permission to access this page"
- Log the access attempt with user ID and attempted route

### Component Loading Errors

**Lazy Loading Failures:**
- Implement error boundaries around the `<Outlet />` component
- When a page component fails to load, display a fallback UI with retry button
- Log the error with component name and stack trace
- Provide "Return to Overview" button as fallback

**Missing Component Props:**
- Validate required props in page components
- Display console warnings for missing props in development
- Provide sensible defaults where possible
- Gracefully degrade functionality if critical props are missing

### State Management Errors

**Session Storage Failures:**
- Wrap session storage access in try-catch blocks
- Fall back to in-memory state if session storage is unavailable
- Log storage errors without breaking functionality
- Continue with default sidebar state (Overview collapsed)

**Invalid State Recovery:**
- Validate sidebar state structure when reading from session storage
- Reset to default state if stored state is corrupted
- Log state validation errors
- Ensure sidebar remains functional even with invalid stored state

### Responsive Behavior Errors

**Viewport Detection Failures:**
- Provide fallback breakpoints if window.matchMedia fails
- Default to desktop layout if viewport size cannot be determined
- Log viewport detection errors
- Ensure sidebar remains accessible via hamburger menu

## Testing Strategy

### Unit Testing

**Sidebar Component Tests:**
- Test menu item rendering with various configurations
- Test expand/collapse behavior for Overview menu
- Test active state highlighting logic
- Test keyboard navigation handlers
- Test click handlers for menu items and submenu items
- Test icon rendering and badge display
- Test role-based menu item visibility

**DashboardLayout Component Tests:**
- Test layout structure rendering (NavigationBar, Sidebar, Outlet, Footer)
- Test prop passing to child components
- Test responsive class application based on viewport
- Test error boundary behavior

**Navigation Logic Tests:**
- Test route matching for active menu determination
- Test URL generation for menu items
- Test submenu expansion logic based on current route
- Test session storage read/write operations
- Test state restoration on component mount

### Property-Based Testing

Each property test should run a minimum of 100 iterations with randomized inputs.

**Property 1 Test: Sidebar Menu Highlighting Consistency**
```typescript
// Feature: sidebar-navigation-redesign, Property 1: Sidebar Menu Highlighting Consistency
// For any valid route, exactly one menu item should be active
test('property: exactly one active menu item for any route', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allValidRoutes),
      (route) => {
        render(<DashboardLayout />, { initialRoute: route });
        const activeItems = screen.getAllByRole('link', { current: 'page' });
        expect(activeItems).toHaveLength(1);
        expect(activeItems[0]).toHaveAttribute('href', route);
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 2 Test: Navigation URL Synchronization**
```typescript
// Feature: sidebar-navigation-redesign, Property 2: Navigation URL Synchronization
// For any menu click, URL should update and correct component should render
test('property: menu click updates URL and renders component', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allMenuItems),
      (menuItem) => {
        render(<DashboardLayout />);
        const menuLink = screen.getByRole('link', { name: menuItem.label });
        fireEvent.click(menuLink);
        expect(window.location.pathname).toBe(menuItem.path);
        expect(screen.getByTestId(`page-${menuItem.id}`)).toBeInTheDocument();
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 3 Test: Submenu Expansion State Consistency**
```typescript
// Feature: sidebar-navigation-redesign, Property 3: Submenu Expansion State Consistency
// For any submenu route, parent menu should be expanded
test('property: submenu routes expand parent menu', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...submenuRoutes),
      (route) => {
        render(<DashboardLayout />, { initialRoute: route });
        const overviewMenu = screen.getByRole('button', { name: /overview/i });
        expect(overviewMenu).toHaveAttribute('aria-expanded', 'true');
        const submenu = screen.getByRole('navigation', { name: /overview submenu/i });
        expect(submenu).toBeVisible();
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 4 Test: Browser Navigation Compatibility**
```typescript
// Feature: sidebar-navigation-redesign, Property 4: Browser Navigation Compatibility
// For any navigation sequence, sidebar should reflect current location
test('property: sidebar reflects browser navigation', () => {
  fc.assert(
    fc.property(
      fc.array(fc.constantFrom(...allValidRoutes), { minLength: 2, maxLength: 5 }),
      (routeSequence) => {
        const { history } = render(<DashboardLayout />);
        
        // Navigate through sequence
        routeSequence.forEach(route => history.push(route));
        
        // Go back through history
        for (let i = 0; i < routeSequence.length - 1; i++) {
          history.back();
          const expectedRoute = routeSequence[routeSequence.length - 2 - i];
          const activeItem = screen.getByRole('link', { current: 'page' });
          expect(activeItem).toHaveAttribute('href', expectedRoute);
        }
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 6 Test: Component Functionality Preservation**
```typescript
// Feature: sidebar-navigation-redesign, Property 6: Component Functionality Preservation
// For any page component, interactive elements should function correctly
test('property: page components maintain functionality', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...pageComponentsWithInteractions),
      (pageConfig) => {
        render(<DashboardLayout />, { initialRoute: pageConfig.route });
        
        // Test each interactive element
        pageConfig.interactions.forEach(interaction => {
          const element = screen.getByRole(interaction.role, { name: interaction.name });
          fireEvent.click(element);
          expect(interaction.expectedBehavior()).toBeTruthy();
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 8 Test: Keyboard Navigation Accessibility**
```typescript
// Feature: sidebar-navigation-redesign, Property 8: Keyboard Navigation Accessibility
// For any menu item, keyboard navigation should work correctly
test('property: keyboard navigation works for all menu items', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allMenuItems),
      (menuItem) => {
        render(<DashboardLayout />);
        const menuLink = screen.getByRole('link', { name: menuItem.label });
        
        // Tab to focus
        menuLink.focus();
        expect(menuLink).toHaveFocus();
        
        // Enter to activate
        fireEvent.keyDown(menuLink, { key: 'Enter', code: 'Enter' });
        expect(window.location.pathname).toBe(menuItem.path);
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 10 Test: State Persistence Across Refreshes**
```typescript
// Feature: sidebar-navigation-redesign, Property 10: State Persistence Across Refreshes
// For any sidebar state, refresh should restore the state
test('property: sidebar state persists across refresh', () => {
  fc.assert(
    fc.property(
      fc.record({
        route: fc.constantFrom(...allValidRoutes),
        expandedMenus: fc.array(fc.constantFrom('overview'), { maxLength: 1 }),
      }),
      (state) => {
        // Set initial state
        const { unmount } = render(<DashboardLayout />, { initialRoute: state.route });
        
        if (state.expandedMenus.includes('overview')) {
          const overviewMenu = screen.getByRole('button', { name: /overview/i });
          fireEvent.click(overviewMenu);
        }
        
        // Store state in session storage
        const storedState = sessionStorage.getItem('sidebarState');
        unmount();
        
        // Re-render (simulating refresh)
        render(<DashboardLayout />, { initialRoute: state.route });
        
        // Verify state restored
        const overviewMenu = screen.getByRole('button', { name: /overview/i });
        const expectedExpanded = state.expandedMenus.includes('overview') || 
                                 submenuRoutes.includes(state.route);
        expect(overviewMenu).toHaveAttribute('aria-expanded', String(expectedExpanded));
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Full Navigation Flow Tests:**
- Test complete user journey: login → navigate through all pages → logout
- Test navigation from Overview quick actions to respective pages
- Test navigation from tracking results to shipment details
- Test navigation using both sidebar and in-page links

**Layout Integration Tests:**
- Test that all page components render correctly within DashboardLayout
- Test that NavigationBar interactions work with sidebar navigation
- Test that Footer remains visible across all pages
- Test that modals and overlays render correctly over the sidebar

**Responsive Behavior Tests:**
- Test sidebar collapse/expand at different breakpoints
- Test content area width adjustment
- Test touch interactions on mobile viewports
- Test hamburger menu functionality

**State Management Integration Tests:**
- Test sidebar state persistence across multiple navigation actions
- Test state synchronization between multiple tabs (if applicable)
- Test state recovery after session storage clear
- Test state behavior with browser back/forward buttons

### Visual Regression Testing

- Capture screenshots of sidebar in various states (collapsed, expanded, active items)
- Capture screenshots of all pages in the new layout
- Compare against baseline images
- Test across different browsers (Chrome, Firefox, Safari, Edge)
- Test at different viewport sizes (1920x1080, 1366x768, 1024x768)

### Accessibility Testing

- Run axe-core automated accessibility tests on all pages
- Test keyboard-only navigation through entire application
- Test screen reader announcements (NVDA, JAWS, VoiceOver)
- Test focus management during navigation
- Test color contrast ratios for sidebar elements
- Test ARIA labels and roles

### Performance Testing

- Measure time to interactive (TTI) for DashboardLayout
- Measure navigation response time (should be < 100ms)
- Measure sidebar animation frame rate (should be 60fps)
- Test with React DevTools Profiler to identify unnecessary re-renders
- Test bundle size impact of new components
- Test lazy loading behavior for page components
