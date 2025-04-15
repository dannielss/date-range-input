import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendar from './index';

describe('Calendar', () => {
  it('should render correctly with default props', () => {
    render(
      <Calendar
        month={new Date(2025, 3, 1)}
        startDate={null}
        endDate={null}
        onDateSelect={() => {}}
      />
    );

    expect(screen.getByText(/April 2025/i)).toBeInTheDocument();
  });

  it('should render correct weekdays', () => {
    render(
      <Calendar
        month={new Date(2025, 3, 1)}
        startDate={null}
        endDate={null}
        onDateSelect={() => {}}
      />
    );

    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    weekdays.forEach(day => {
      expect(screen.queryAllByText(day)[0]).toBeInTheDocument();
    });
  });

  it('should highlight selected date correctly', async () => {
    const mockSelectDate = jest.fn();
    const selectedDate = new Date(2025, 3, 15);

    render(
      <Calendar
        month={new Date(2025, 3, 1)}
        startDate={selectedDate}
        endDate={null}
        onDateSelect={mockSelectDate}
      />
    );

    const selectedDay = screen.getByText('15');
    expect(selectedDay).toHaveClass('calendar-day');

    await userEvent.click(selectedDay);
    expect(mockSelectDate).toHaveBeenCalledWith(selectedDate);
    expect(selectedDay).toHaveClass('calendar-day-selected');
  });

  it('should highlight date range correctly', () => {
    const mockSelectDate = jest.fn();
    const startDate = new Date(2025, 3, 15);
    const endDate = new Date(2025, 3, 20);

    render(
      <Calendar
        month={new Date(2025, 3, 1)}
        startDate={startDate}
        endDate={endDate}
        onDateSelect={mockSelectDate}
      />
    );

    const inRangeDays = ['16', '17', '18', '19'];
    inRangeDays.forEach(day => {
      const dayElement = screen.getByText(day);
      expect(dayElement).toHaveClass('calendar-day-in-range');
    });

    const startDay = screen.getByText('15');
    const endDay = screen.getByText('20');
    expect(startDay).toHaveClass('calendar-day-selected');
    expect(endDay).toHaveClass('calendar-day-selected');
  });

  it('should call onDateSelect when a day is clicked', async () => {
    const mockSelectDate = jest.fn();
    const someDate = new Date(2025, 3, 15);

    render(
      <Calendar
        month={new Date(2025, 3, 1)}
        startDate={null}
        endDate={null}
        onDateSelect={mockSelectDate}
      />
    );

    const day = screen.getByText('15');
    await userEvent.click(day);
    expect(mockSelectDate).toHaveBeenCalledWith(someDate);
  });

  it('should render custom day if provided', () => {
    const customRenderDay = (date: Date, isSelected: boolean, isInRange: boolean) => (
      <span>{isSelected ? 'Selected' : 'Custom'}</span>
    );

    render(
      <Calendar
        month={new Date(2025, 3, 1)}
        startDate={null}
        endDate={null}
        onDateSelect={() => {}}
        renderDay={customRenderDay}
      />
    );

    const dayElement = screen.queryAllByText('Custom')[0];
    expect(dayElement).toBeInTheDocument();
  });
});
