import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRangeInput } from './index';

describe('DateRangeInput', () => {
  jest.useFakeTimers({ advanceTimers: true });

  beforeAll(() => {
    jest.setSystemTime(new Date(2025, 3, 15));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const setup = (props = {}) => {
    const onChange = jest.fn();
    const utils = render(
      <DateRangeInput
        startDate={null}
        endDate={null}
        onChange={onChange}
        initialMonth={new Date(2025, 3, 1)}
        startDatePlaceholder="Start"
        endDatePlaceholder="End"
        {...props}
      />
    );
    return { ...utils, onChange };
  };

  it('should render placeholders', () => {
    setup();

    expect(screen.getByText(/Start - End/i)).toBeInTheDocument();
  });

  it('should render custom placeholders', () => {
    setup({
      startDatePlaceholder: 'From',
      endDatePlaceholder: 'To',
    });

    expect(screen.getByText(/From - To/i)).toBeInTheDocument();
  });

  it('should start with the default month (current)', async () => {
    setup({
      initialMonth: undefined,
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);

    expect(screen.getByText('April 2025')).toBeInTheDocument();
  });

  it('should open and close popup on input click and outside click', async () => {
    const onTogglePopup = jest.fn();
    setup({
      onToggle: onTogglePopup,
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);

    expect(screen.getByText('April 2025')).toBeInTheDocument();

    await userEvent.click(document.body);

    expect(screen.queryByText('April 2025')).not.toBeInTheDocument();
  });

  it('should toggle popup on input click without onToggle', async () => {
    setup({
      onToggle: null,
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);

    expect(screen.getByText('April 2025')).toBeInTheDocument();
  });

  it('should select start date on first click', async () => {
    const customOnChange = jest.fn();
    setup({
      onChange: customOnChange,
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 3, 20),
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);
    const firstDate = screen.queryAllByText('21')[1];

    await userEvent.click(firstDate);
    expect(customOnChange).toHaveBeenCalledTimes(1);
  });

  it('should invert date when end date is in the past', async () => {
    const customOnChange = jest.fn();
    setup({
      onChange: customOnChange,
      startDate: new Date(2025, 3, 20),
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);

    const secondDate = screen.queryAllByText('15')[0];
    await userEvent.click(secondDate);

    expect(customOnChange).toHaveBeenCalledWith({
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 3, 20),
    });
  });

  it('should select endDate correctly', async () => {
    const customOnChange = jest.fn();
    setup({
      onChange: customOnChange,
      startDate: new Date(2025, 3, 15),
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);

    const endDate = screen.queryAllByText('20')[0];
    await userEvent.click(endDate);

    expect(customOnChange).toHaveBeenCalledWith({
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 3, 20),
    });
  });

  it('should clear dates on close icon click', async () => {
    const customOnChange = jest.fn();
    setup({
      onChange: customOnChange,
    });

    const input = screen.getByRole('button');
    await userEvent.click(input);

    const firstDate = screen.queryAllByText('15')[0];
    await userEvent.click(firstDate);

    const secondDate = screen.queryAllByText('16')[1];
    await userEvent.click(secondDate);

    expect(customOnChange).toHaveBeenCalledTimes(2);

    const closeIcon = screen.getByTestId('close-icon');
    await userEvent.click(closeIcon);

    expect(screen.queryByText('15')).not.toBeInTheDocument();

    expect(customOnChange).toHaveBeenCalledWith({
      startDate: null,
      endDate: null,
    });
  });

  it('should navigate to next month on right arrow click', async () => {
    setup();

    const input = screen.getByRole('button');
    await userEvent.click(input);

    const rightArrow = screen.getByTestId('right-arrow');
    await userEvent.click(rightArrow);

    expect(screen.getByText('May 2025')).toBeInTheDocument();
  });

  it('should navigate to previous month on left arrow click', async () => {
    setup();

    const input = screen.getByRole('button');
    await userEvent.click(input);

    const leftArrow = screen.getByTestId('left-arrow');
    await userEvent.click(leftArrow);

    expect(screen.getByText('March 2025')).toBeInTheDocument();
  });

  it('should open when externalIsOpen is true', async () => {
    setup({
      isOpen: true,
    });

    expect(screen.getByText('April 2025')).toBeInTheDocument();
  });
});
