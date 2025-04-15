import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';
import { formatDate } from '../../utils';

describe('Input', () => {
  const mockTogglePopup = jest.fn();
  const mockHandleClear = jest.fn();
  const inputRef: React.RefObject<HTMLButtonElement> | { current: null } = { current: null };

  const startDate = new Date(2025, 3, 10);
  const endDate = new Date(2025, 3, 15);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render placeholders when no dates are selected', () => {
    render(
      <Input
        inputRef={inputRef}
        startDate={null}
        endDate={null}
        handleClear={mockHandleClear}
        togglePopup={mockTogglePopup}
      />
    );

    expect(screen.getByText('Start Date - End Date')).toBeInTheDocument();
  });

  it('should render custom placeholders if provided', () => {
    render(
      <Input
        inputRef={inputRef}
        startDate={null}
        endDate={null}
        handleClear={mockHandleClear}
        togglePopup={mockTogglePopup}
        startDatePlaceholder="From"
        endDatePlaceholder="To"
      />
    );

    expect(screen.getByText('From - To')).toBeInTheDocument();
  });

  it('should render formatted start and end dates', () => {
    render(
      <Input
        inputRef={inputRef}
        startDate={startDate}
        endDate={endDate}
        handleClear={mockHandleClear}
        togglePopup={mockTogglePopup}
      />
    );

    const expectedText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should call togglePopup when button is clicked', async () => {
    render(
      <Input
        inputRef={inputRef}
        startDate={startDate}
        endDate={endDate}
        handleClear={mockHandleClear}
        togglePopup={mockTogglePopup}
      />
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mockTogglePopup).toHaveBeenCalledTimes(1);
  });

  it('should call handleClear when close icon is clicked', async () => {
    render(
      <Input
        inputRef={inputRef}
        startDate={startDate}
        endDate={endDate}
        handleClear={mockHandleClear}
        togglePopup={mockTogglePopup}
      />
    );

    const closeIcon = screen.getByTestId('close-icon');
    await userEvent.click(closeIcon);

    expect(mockHandleClear).toHaveBeenCalledTimes(1);
  });
});
