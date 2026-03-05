# Implementation Plan: Sidebar Navigation Redesign

## Overview

This implementation plan breaks down the sidebar navigation redesign into discrete, incremental tasks. The approach follows a bottom-up strategy: first creating the new Sidebar component, then refactoring the Dashboard into DashboardLayout with routing, and finally adapting all page components to work in the new layout. Each task builds on previous work, with checkpoints to ensure stability before proceeding.

## Tasks

- [x] 1. Create Sidebar component with menu structure
  - Create `src/components/Sidebar.tsx` and `src/components/Sidebar.css`
  - Implement menu item configuration with primary and submenu items
  - Implement basic rendering of menu items (no interactions yet)
  - Add icons/visual indicators for menu items
  - Implement fixed-position styling on the left side
  - _Requirements: 1.1, 1.2, 1.4, 6.1, 6.2, 6.8_

- [x] 1.1 Write unit tests for Sidebar component structure
  - Test menu item rendering with various configurations
  - Test icon and badge rendering
  - Test role-based menu visibility
  - _Requirements: 1.1, 1.2, 1.4_

- [-] 2. Implement Sidebar navigation and interaction logic
  - [x] 2.1 Add click handlers for menu items and submenu items
    - Implement `handleMenuClick` for primary menu items
    - Implement `handleSubmenuClick` for submenu navigation
    - Use `useNavigate` hook for programmatic navigation
    - _Requirements: 1.5, 1.6, 5.1_

  - [x] 2.2 Implement expand/collapse functionality for Overview menu
    - Add state management for expanded menus using `useState`
    - Implement toggle logic for Overview menu
    - Add smooth CSS transitions for expand/collapse animations
    - _Requirements: 1.3, 6.5_

  - [x] 2.3 Implement active menu item highlighting
    - Use `useLocation` hook to track current route
    - Implement `isActive` function to determine active menu item
    - Apply active styling to current menu item
    - Implement `shouldExpand` logic to auto-expand parent menu for submenu routes
    - _Requirements: 1.7, 1.8, 5.3_

  - [ ] 2.4 Write property test for menu highlighting consistency
    - **Property 1: Sidebar Menu Highlighting Consistency**
    - **Validates: Requirements 1.7, 1.8, 5.3**

  - [ ] 2.5 Write property test for navigation URL synchronization
    - **Property 2: Navigation URL Synchronization**
    - **Validates: Requirements 5.1, 5.4**

- [ ] 3. Implement Sidebar state persistence
  - [ ] 3.1 Add session storage integration
    - Implement state save to session storage on changes
    - Implement state restore from session storage on mount
    - Add error handling for storage failures
    - _Requirements: 10.3, 10.4_

  - [ ] 3.2 Implement state restoration logic
    - Restore expanded menus based on current route
    - Restore active item based on URL
    - Handle invalid stored state gracefully
    - _Requirements: 10.5_

  - [ ] 3.3 Write property test for state persistence
    - **Property 10: State Persistence Across Refreshes**
    - **Validates: Requirements 10.3, 10.5**

- [ ] 4. Implement Sidebar accessibility features
  - [ ] 4.1 Add keyboard navigation support
    - Add keyboard event handlers for Tab, Enter, Space, Arrow keys
    - Implement focus management for menu items
    - Add visible focus indicators
    - _Requirements: 8.1, 8.2, 8.5, 8.6_

  - [ ] 4.2 Add ARIA attributes and roles
    - Add `role="navigation"` to sidebar
    - Add `aria-expanded` to expandable menu items
    - Add `aria-current="page"` to active menu item
    - Add `aria-label` for screen reader context
    - _Requirements: 8.3, 8.4_

  - [ ] 4.3 Write property test for keyboard navigation
    - **Property 8: Keyboard Navigation Accessibility**
    - **Validates: Requirements 8.1, 8.5, 8.6**

- [ ] 5. Checkpoint - Test Sidebar component in isolation
  - Ensure all tests pass
  - Manually test Sidebar with mock routing
  - Verify accessibility with keyboard navigation
  - Ask the user if questions arise

- [-] 6. Create DashboardLayout component
  - [x] 6.1 Create `src/layouts/DashboardLayout.tsx` and `src/layouts/DashboardLayout.css`
    - Create layout structure with NavigationBar, Sidebar, and content area
    - Use React Router's `<Outlet />` for content area
    - Implement responsive grid/flexbox layout
    - _Requirements: 2.3, 2.4, 2.5, 2.6_

  - [x] 6.2 Integrate Sidebar into DashboardLayout
    - Pass `currentUser` prop to Sidebar
    - Position Sidebar on the left side
    - Ensure Sidebar is fixed-position
    - _Requirements: 2.6, 11.1_

  - [x] 6.3 Style content area for proper spacing
    - Add padding and margins to content area
    - Ensure content area is scrollable
    - Implement responsive width calculations
    - _Requirements: 2.7, 7.4_

  - [ ] 6.4 Write unit tests for DashboardLayout
    - Test layout structure rendering
    - Test prop passing to child components
    - Test responsive class application

- [x] 7. Update routing configuration in App.tsx
  - [x] 7.1 Refactor routes to use nested routing
    - Wrap all dashboard routes under DashboardLayout parent route
    - Convert existing routes to child routes
    - Add index route redirect to `/overview`
    - _Requirements: 5.4, 5.5_

  - [x] 7.2 Update route paths for consistency
    - Ensure all paths match Sidebar menu configuration
    - Update any hardcoded navigation paths in components
    - Test direct URL access for all routes
    - _Requirements: 5.4, 7.7_

  - [ ] 7.3 Write property test for browser navigation compatibility
    - **Property 4: Browser Navigation Compatibility**
    - **Validates: Requirements 5.2, 5.3**

  - [ ] 7.4 Write property test for routing path preservation
    - **Property 7: Routing Path Preservation**
    - **Validates: Requirements 3.5, 5.4**

- [ ] 8. Remove deprecated components
  - [ ] 8.1 Remove WelcomeHeader component usage
    - Remove `<WelcomeHeader />` from all pages
    - Delete `src/components/WelcomeHeader.tsx`
    - Delete `src/components/WelcomeHeader.css`
    - _Requirements: 2.1_

  - [ ] 8.2 Remove MainNavigation component
    - Delete `src/components/MainNavigation.tsx`
    - Delete `src/components/MainNavigation.css`
    - Remove any imports and references
    - _Requirements: 2.2_

  - [ ] 8.3 Refactor old Dashboard.tsx
    - Remove module-switching logic
    - Remove `activeModule` state
    - Remove `renderModuleContent` method
    - Keep any reusable logic for DashboardLayout
    - _Requirements: 2.2, 3.1_

- [ ] 9. Checkpoint - Test routing and layout integration
  - Ensure all routes work correctly
  - Test browser back/forward navigation
  - Test direct URL access
  - Verify layout structure on all pages
  - Ask the user if questions arise

- [ ] 10. Adapt Overview page for new layout
  - [ ] 10.1 Remove duplicate navigation elements from Overview
    - Remove any tab navigation or module switching UI
    - Keep tracking search and quick action cards
    - _Requirements: 4.1_

  - [ ] 10.2 Update Overview page styling
    - Wrap content in `.page-container` div
    - Adjust spacing for sidebar layout
    - Ensure tracking results display properly
    - _Requirements: 4.2, 4.3, 4.4_

  - [ ] 10.3 Update Overview navigation to use React Router
    - Replace `onNavigate` prop usage with `useNavigate` hook
    - Update quick action card click handlers
    - Update tracking result card navigation
    - _Requirements: 4.5, 4.6, 4.7_

  - [ ] 10.4 Write integration tests for Overview page
    - Test tracking search functionality
    - Test quick action card navigation
    - Test filter and export functionality

- [ ] 11. Adapt remaining page components for new layout
  - [ ] 11.1 Adapt TrackPackage page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure proper spacing and responsive width
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.2 Adapt ShipWithAccount page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure form layout works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.3 Adapt SchedulePickup page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure form layout works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.4 Adapt CancelPickup page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure table/list layout works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.5 Adapt CalculateRates page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure calculator form works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.6 Adapt Preferences page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure settings form works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.7 Adapt Reports page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure report tables and filters work in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.8 Adapt Billing page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure billing tables and forms work in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.9 Adapt Claim page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure claim form works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.10 Adapt ShipmentDetails page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure detail view works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.11 Adapt ProofOfDelivery page
    - Wrap content in `.page-container`
    - Remove any WelcomeHeader references
    - Ensure proof display works in content area
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 11.12 Write property test for component functionality preservation
    - **Property 6: Component Functionality Preservation**
    - **Validates: Requirements 3.4, 3.5, 4.6, 4.7**

- [ ] 12. Adapt UserManagement and AddressBook components
  - [ ] 12.1 Update UserManagement component for content area
    - Ensure component works as a routed page
    - Update any navigation or modal interactions
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 12.2 Update AddressBook component for content area
    - Ensure component works as a routed page
    - Update any modal or form interactions
    - _Requirements: 3.1, 3.2, 3.4_

- [ ] 13. Checkpoint - Test all pages in new layout
  - Navigate through all pages via sidebar
  - Test all interactive elements on each page
  - Verify no broken functionality
  - Test responsive behavior at different viewport sizes
  - Ask the user if questions arise

- [ ] 14. Implement responsive sidebar behavior
  - [ ] 14.1 Add viewport detection and breakpoint logic
    - Use `window.matchMedia` or resize listeners
    - Define breakpoints: desktop (>1024px), tablet (768-1024px), mobile (<768px)
    - Add state for sidebar collapse on mobile
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 14.2 Implement hamburger menu for mobile
    - Create hamburger icon button
    - Implement overlay sidebar for mobile viewports
    - Add close button for mobile sidebar
    - Implement touch gestures for swipe-to-close
    - _Requirements: 7.3_

  - [ ] 14.3 Adjust content area width responsively
    - Calculate content area width based on sidebar state
    - Ensure content remains usable when sidebar is collapsed
    - Test scrolling behavior on mobile
    - _Requirements: 7.4_

  - [ ] 14.4 Write property test for responsive width adaptation
    - **Property 9: Responsive Width Adaptation**
    - **Validates: Requirements 2.7, 7.4**

- [ ] 15. Implement error boundaries and error handling
  - [ ] 15.1 Create ErrorBoundary component for content area
    - Wrap `<Outlet />` in ErrorBoundary
    - Implement fallback UI with retry button
    - Add error logging
    - _Requirements: Component Loading Errors section_

  - [ ] 15.2 Add navigation error handling
    - Implement invalid route redirect to `/overview`
    - Add permission-based access checks
    - Display toast notifications for errors
    - _Requirements: Navigation Errors section_

  - [ ] 15.3 Add session storage error handling
    - Wrap storage access in try-catch blocks
    - Fall back to in-memory state on storage failure
    - Log storage errors
    - _Requirements: State Management Errors section_

- [ ] 16. Implement submenu expansion state logic
  - [ ] 16.1 Add auto-expansion for submenu routes
    - Detect when current route is a submenu item
    - Automatically expand Overview menu
    - Persist expansion state
    - _Requirements: 10.1, 10.2_

  - [ ] 16.2 Add collapse logic for non-submenu routes
    - Detect when navigating away from submenu routes
    - Collapse Overview menu
    - Update session storage
    - _Requirements: 10.2_

  - [ ] 16.3 Write property test for submenu expansion consistency
    - **Property 3: Submenu Expansion State Consistency**
    - **Validates: Requirements 1.3, 10.1, 10.2**

- [ ] 17. Add visual polish and animations
  - [ ] 17.1 Implement hover effects for menu items
    - Add hover background color changes
    - Add hover cursor pointer
    - Ensure smooth transitions
    - _Requirements: 6.3_

  - [ ] 17.2 Implement active state styling
    - Add distinct active background color
    - Add left border indicator for active item
    - Add icon color change for active state
    - _Requirements: 6.4_

  - [ ] 17.3 Refine expand/collapse animations
    - Use CSS transitions for smooth height changes
    - Add rotation animation for expand/collapse icon
    - Ensure 60fps animation performance
    - _Requirements: 6.5, 9.4_

  - [ ] 17.4 Add loading states for page transitions
    - Show loading indicator during lazy loading
    - Add fade-in animation for page content
    - Ensure smooth visual transitions
    - _Requirements: 9.2, 9.3_

- [ ] 18. Implement layout structure preservation
  - [ ] 18.1 Ensure NavigationBar remains fixed at top
    - Set `position: fixed` with `top: 0`
    - Adjust DashboardLayout padding to account for fixed header
    - Test scrolling behavior
    - _Requirements: 2.4_

  - [ ] 18.2 Ensure Footer remains at bottom
    - Position Footer below content area
    - Ensure Footer is visible on all pages
    - Test with varying content heights
    - _Requirements: 2.5, 11.6_

  - [ ] 18.3 Write property test for layout structure preservation
    - **Property 5: Layout Structure Preservation**
    - **Validates: Requirements 2.4, 2.5, 2.6, 11.6**

- [ ] 19. Final checkpoint - Comprehensive testing
  - Run all unit tests and property tests
  - Perform manual testing of all navigation flows
  - Test keyboard navigation through entire application
  - Test responsive behavior at all breakpoints
  - Test browser back/forward navigation
  - Test direct URL access for all routes
  - Verify accessibility with screen reader
  - Check console for errors or warnings
  - Ask the user if questions arise

- [ ] 20. Performance optimization
  - [ ] 20.1 Implement lazy loading for page components
    - Use React.lazy() for page components
    - Add Suspense boundaries with loading fallbacks
    - Test loading behavior
    - _Requirements: 9.3_

  - [ ] 20.2 Optimize re-renders
    - Use React.memo for Sidebar component
    - Use useMemo for menu configuration
    - Use useCallback for event handlers
    - Profile with React DevTools
    - _Requirements: 9.5_

  - [ ] 20.3 Optimize bundle size
    - Analyze bundle with webpack-bundle-analyzer
    - Code-split large dependencies
    - Remove unused imports
    - _Requirements: Performance Testing section_

- [ ] 21. Documentation and cleanup
  - [ ] 21.1 Update component documentation
    - Add JSDoc comments to Sidebar component
    - Add JSDoc comments to DashboardLayout component
    - Document props and interfaces
    - Add usage examples

  - [ ] 21.2 Update README with new architecture
    - Document new routing structure
    - Document sidebar menu configuration
    - Add screenshots of new layout
    - Document responsive breakpoints

  - [ ] 21.3 Clean up unused code and files
    - Remove commented-out code
    - Remove unused imports
    - Remove unused CSS classes
    - Delete deprecated component files

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: component → layout → routing → pages → polish
- All existing functionality must be preserved during the migration
- The new layout should feel natural and intuitive for users familiar with SF Express
