import React from 'react';
import { render, screen } from '@testing-library/react';
import WelcomeHeader from './WelcomeHeader';

describe('WelcomeHeader Component', () => {
  test('displays MY ACCOUNT title', () => {
    render(<WelcomeHeader userName="John" />);
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('MY ACCOUNT');
  });

  test('displays illustration', () => {
    render(<WelcomeHeader userName="John" />);
    const illustration = screen.getByTestId('illustration');
    expect(illustration).toBeInTheDocument();
  });

  test('displays custom illustration when URL provided', () => {
    const illustrationUrl = 'https://example.com/image.png';
    render(<WelcomeHeader userName="John" illustrationUrl={illustrationUrl} />);
    const img = screen.getByAltText('Welcome illustration');
    expect(img).toHaveAttribute('src', illustrationUrl);
  });
});
