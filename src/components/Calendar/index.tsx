import React from 'react';
import {
  format,
  startOfMonth,
  startOfWeek,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
} from 'date-fns';

import './style.css';
import { customCalendarStyle } from '../../utils';
import clsx from 'clsx';

interface CalendarProps {
  month: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
  highlightColor?: string;
  highlightRangeColor?: string;
  renderDay?: (date: Date, isSelected: boolean, isInRange: boolean) => React.ReactNode;
  color?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  month,
  startDate,
  endDate,
  onDateSelect,
  highlightColor = '#007bff',
  highlightRangeColor = '#cce5ff',
  renderDay,
  color = '#fff',
}) => {
  const firstDayOfMonth = startOfMonth(month);

  const firstDayGrid = startOfWeek(firstDayOfMonth);
  const days = Array.from(
    { length: 42 },
    (_, i) =>
      new Date(firstDayGrid.getFullYear(), firstDayGrid.getMonth(), firstDayGrid.getDate() + i)
  );

  return (
    <div className="calendar">
      <h2 className="calendar-header">{format(firstDayOfMonth, 'MMMM yyyy')}</h2>

      <div className="calendar-weekdays">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {days.map(day => {
          const isOutsideMonth = !isSameMonth(day, month);
          const isSelected =
            !isOutsideMonth &&
            ((startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate)));
          const isInRange =
            !isOutsideMonth &&
            startDate &&
            endDate &&
            isAfter(day, startDate) &&
            isBefore(day, endDate);

          const dayClass = clsx(
            'calendar-day',
            isSameDay(day, new Date()) && 'calendar-day-today',
            isSelected && 'calendar-day-selected',
            isInRange && 'calendar-day-in-range',
            isOutsideMonth && 'calendar-day-outside'
          );

          return (
            <div
              key={day.toString()}
              className={dayClass}
              onClick={() => !isOutsideMonth && onDateSelect(day)}
              style={customCalendarStyle(
                isSelected,
                isInRange,
                highlightColor,
                highlightRangeColor,
                color
              )}
            >
              {renderDay ? renderDay(day, !!isSelected, !!isInRange) : format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
