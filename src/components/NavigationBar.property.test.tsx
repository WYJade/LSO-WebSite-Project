import React from 'react';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import NavigationBar from './NavigationBar';
import { navigationStateGenerator } from '../utils/testGenerators';

describe('NavigationBar Property-Based Tests', () => {
  // Feature: lso-account-dashboard, Property 1: Navigation bar presence
  test('navigation bar appears on all pages', () => {
    fc.assert(
      fc.property(navigationStateGenerator(), (state) => {
        const { container } = render(<NavigationBar {...state} />);
        const navBar = container.querySelector('[data-testid="navigation-bar"]');
        expect(navBar).toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: lso-account-dashboard, Property 2: Required menu items presence
  test('all required menu items are present', () => {
    fc.assert(
      fc.property(navigationStateGenerator(), (state) => {
        const { container } = render(<NavigationBar {...state} />);
        const requiredItems = ['SHIPPING', 'SERVICES', 'TRACKING', 'ABOUT US'];
        requiredItems.forEach((item) => {
          expect(container).toHaveTextContent(item);
        });
      }),
      { numRuns: 100 }
    );
  });

  // Feature: lso-account-dashboard, Property 3: Menu navigation behavior
  test('menu items trigger navigation callback', () => {
    fc.assert(
      fc.property(navigationStateGenerator(), (state) => {
        const mockCallback = jest.fn();
        const propsWithMock = { ...state, onMenuItemClick: mockCallback };
        const { getByTestId } = render(<NavigationBar {...propsWithMock} />);
        
        const menuButton = getByTestId('menu-shipping');
        menuButton.click();
        
        expect(mockCallback).toHaveBeenCalled();
      }),
      { numRuns: 100 }
    );
  });
});
