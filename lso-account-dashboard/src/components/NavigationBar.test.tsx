import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';
import { User, UserRole } from '../types/models';

describe('NavigationBar Component', () => {
  const mockUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: UserRole.USER,
    language: 'EN',
    region: 'US',
  };

  const mockProps = {
    currentUser: mockUser,
    onLogoClick: jest.fn(),
    onMenuItemClick: jest.fn(),
    onSearch: jest.fn(),
    onLanguageChange: jest.fn(),
  };

  test('displays LSO logo', () => {
    render(<NavigationBar {...mockProps} />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('displays all menu items', () => {
    render(<NavigationBar {...mockProps} />);
    expect(screen.getByText('SHIPPING')).toBeInTheDocument();
    expect(screen.getByText('SERVICES')).toBeInTheDocument();
    expect(screen.getByText('TRACKING')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();
  });

  test('displays language selector', () => {
    render(<NavigationBar {...mockProps} />);
    const languageSelector = screen.getByTestId('language-selector');
    expect(languageSelector).toBeInTheDocument();
  });

  test('displays search input with correct placeholder', () => {
    render(<NavigationBar {...mockProps} />);
    const searchInput = screen.getByPlaceholderText('Track a package');
    expect(searchInput).toBeInTheDocument();
  });

  test('search input exists in navigation bar', () => {
    render(<NavigationBar {...mockProps} />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
