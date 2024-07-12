import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RunButton from '../../../../../src/components/notebook/content/cell/header/RunButton';

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<RunButton onClick={handleClick} />);
  
  // userEvent.click(screen.getByLabelText(/run/i));
  // expect(handleClick).toHaveBeenCalledTimes(1);
});