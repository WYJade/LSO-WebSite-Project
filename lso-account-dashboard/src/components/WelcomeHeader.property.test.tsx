import React from 'react';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import WelcomeHeader from './WelcomeHeader';
import { userGenerator } from '../utils/testGenerators';

describe('WelcomeHeader Property-Based Tests', () => {
  // Feature: lso-account-dashboard, Property 4: Personalized greeting format
  test('greeting displays correct format for any user', () => {
    fc.assert(
      fc.property(userGenerator(), (user) => {
        const { container } = render(<WelcomeHeader userName={user.firstName} />);
        const expectedGreeting = `HI ${user.firstName.toUpperCase()},`;
        expect(container).toHaveTextContent(expectedGreeting);
      }),
      { numRuns: 100 }
    );
  });
});
