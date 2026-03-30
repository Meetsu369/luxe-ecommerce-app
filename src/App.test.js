import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LUXE logo in navbar', () => {
  render(<App />);
  const logo = screen.getByText(/LUXE/i);
  expect(logo).toBeInTheDocument();
});

test('renders product section heading', () => {
  render(<App />);
  const heading = screen.getByText(/Our Products/i);
  expect(heading).toBeInTheDocument();
});

test('renders Add to Bag buttons', () => {
  render(<App />);
  const addButtons = screen.getAllByText(/Add to Bag/i);
  expect(addButtons.length).toBeGreaterThan(0);
});
