/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  test('allows user to add task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('New task');
    const button = screen.getByText('Add task');

    await act(() => {
      userEvent.type(input, 'Test task');
      fireEvent.click(button);
    });

    await screen.findByText('Test task');

    expect(input).toHaveValue('');
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });
});
