# LSO Account Dashboard

A modern account management dashboard for LSO logistics company, built with React and TypeScript.

## Features

- **Navigation Bar**: Global navigation with search functionality
- **User Welcome**: Personalized greeting and account overview
- **Tab Navigation**: Switch between different account sections
- **Tracking Cards**: Quick access to package tracking, reports, and delivery proof
- **Shipment Management**: View and manage shipments
- **Address Book**: Manage shipping addresses
- **User Management**: Add and manage account users
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

- React 19
- TypeScript 4.9
- React Router 7
- CSS Modules
- Fast-check (Property-Based Testing)
- React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd lso-account-dashboard
npm install
```

### Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
# Run all tests
npm test

# Run tests without watch mode
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --coverage
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
lso-account-dashboard/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── NavigationBar.tsx
│   │   ├── WelcomeHeader.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── TrackingCard.tsx
│   │   ├── TrackingSection.tsx
│   │   ├── ShipmentSection.tsx
│   │   ├── AddressBook.tsx
│   │   └── UserManagement.tsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx
│   │   └── OverviewTab.tsx
│   ├── types/            # TypeScript type definitions
│   │   ├── models.ts
│   │   └── components.ts
│   ├── utils/            # Utility functions
│   │   └── testGenerators.ts
│   ├── styles/           # Global styles
│   │   ├── theme.css
│   │   └── global.css
│   └── App.tsx           # Main application component
├── public/               # Static assets
└── package.json
```

## Design System

The application follows LSO brand guidelines with:

- **Primary Color**: #003366 (Navy Blue)
- **Secondary Color**: #4A90E2 (Light Blue)
- **Accent Colors**: Green (#7ED321), Orange (#F5A623), Red (#dc3545)
- **Typography**: System fonts with clear hierarchy
- **Spacing**: Consistent 8px grid system
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Testing Strategy

The project uses a dual testing approach:

### Unit Tests
- Component rendering tests
- Interaction tests
- Edge case tests

### Property-Based Tests
- Tests universal properties across all inputs
- Uses fast-check library
- Each property test runs 100 iterations

## Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests in watch mode
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - LSO Internal Use Only
