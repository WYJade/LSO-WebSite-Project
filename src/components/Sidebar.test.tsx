import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User, UserRole } from '../types/models';

const mockUser: User = {
  id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  role: UserRole.ADMIN,
  language: 'EN',
  region: 'US',
};

const renderSidebar = (user: User = mockUser) => {
  return render(
    <BrowserRouter>
      <Sidebar currentUser={user} />
    </BrowserRouter>
  );
};

describe('Sidebar Component Structure', () => {
  test('renders all primary menu items', () => {
    renderSidebar();
    
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Claim')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Address book')).toBeInTheDocument();
    expect(screen.getByText('Report')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  test('renders sidebar with navigation role', () => {
    renderSidebar();
    
    const sidebar = screen.getByRole('navigation', { name: /main navigation/i });
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('sidebar');
  });

  test('renders menu items as buttons', () => {
    renderSidebar();
    
    const overviewButton = screen.getByRole('button', { name: /overview/i });
    expect(overviewButton).toBeInTheDocument();
    expect(overviewButton).toHaveClass('sidebar-menu-button');
  });

  test('renders expand icon for Overview menu with submenu', () => {
    renderSidebar();
    
    const overviewButton = screen.getByRole('button', { name: /overview/i });
    const expandIcon = overviewButton.querySelector('.expand-icon');
    expect(expandIcon).toBeInTheDocument();
  });

  test('does not render expand icon for menu items without submenu', () => {
    renderSidebar();
    
    const claimButton = screen.getByRole('button', { name: /^claim$/i });
    const expandIcon = claimButton.querySelector('.expand-icon');
    expect(expandIcon).not.toBeInTheDocument();
  });

  test('renders correct aria-expanded attribute for Overview menu', () => {
    renderSidebar();
    
    const overviewButton = screen.getByRole('button', { name: /overview/i });
    expect(overviewButton).toHaveAttribute('aria-expanded');
  });

  test('does not render aria-expanded for non-expandable menu items', () => {
    renderSidebar();
    
    const claimButton = screen.getByRole('button', { name: /^claim$/i });
    expect(claimButton).not.toHaveAttribute('aria-expanded');
  });
});
