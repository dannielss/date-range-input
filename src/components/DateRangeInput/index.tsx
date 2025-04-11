import React, { useState, useRef, useEffect } from 'react';
import { addMonths } from 'date-fns';
import clsx from 'clsx';
import Calendar from '../Calendar';
import Input from '../Input';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useAnchorPosition } from '../../hooks';
import './style.css';

export interface DateRangeInputProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
  initialMonth?: Date;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  calendars?: number;
  highlightColor?: string;
  highlightRangeColor?: string;
  renderDay?: (date: Date, isSelected: boolean, isInRange: boolean) => React.ReactNode;
  className?: string;
  popupClassName?: string;
  calendarContainerClassName?: string;
  navigationButtonClassName?: string;
  color?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  startDate,
  endDate,
  onChange,
  initialMonth = new Date(),
  isOpen: externalIsOpen,
  onToggle,
  anchor = 'bottom',
  calendars = 2,
  highlightColor,
  highlightRangeColor,
  renderDay,
  className,
  popupClassName,
  calendarContainerClassName,
  navigationButtonClassName,
  color,
  startDatePlaceholder,
  endDatePlaceholder,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = externalIsOpen ?? internalIsOpen;
  const adjustedAnchor = useAnchorPosition({
    anchor,
    inputRef,
    isOpen,
    popupRef,
  });

  const togglePopup = () => {
    const newState = !isOpen;
    setInternalIsOpen(newState);
    onToggle?.(newState);
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onChange({ startDate: date, endDate: null });
    } else if (date < startDate) {
      onChange({ startDate: date, endDate: startDate });
    } else {
      onChange({ startDate, endDate: date });
    }
  };

  const handleClear = () => {
    setInternalIsOpen(false);
    onChange({
      startDate: null,
      endDate: null,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        popupRef.current &&
        inputRef.current &&
        !popupRef.current.contains(target) &&
        !inputRef.current.contains(target)
      ) {
        if (externalIsOpen === undefined) {
          setInternalIsOpen(false);
        }
        onToggle?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, externalIsOpen, onToggle]);

  return (
    <div className={clsx('date-range-container', className)}>
      <Input
        inputRef={inputRef}
        startDate={startDate}
        endDate={endDate}
        handleClear={handleClear}
        togglePopup={togglePopup}
        startDatePlaceholder={startDatePlaceholder}
        endDatePlaceholder={endDatePlaceholder}
      />

      {isOpen && (
        <div
          ref={popupRef}
          className={clsx('date-range-popup', `anchor-${adjustedAnchor}`, popupClassName)}
        >
          <div className={clsx('calendar-container', calendarContainerClassName)}>
            <button
              className={clsx('navigation-icon-left', 'navigation', navigationButtonClassName)}
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            >
              <FaArrowLeft />
            </button>

            {Array.from({ length: calendars }).map((_, index) => (
              <div key={index}>
                <Calendar
                  month={addMonths(currentMonth, index)}
                  startDate={startDate}
                  endDate={endDate}
                  onDateSelect={handleDateSelect}
                  highlightColor={highlightColor}
                  highlightRangeColor={highlightRangeColor}
                  renderDay={renderDay}
                  color={color}
                />
              </div>
            ))}

            <button
              className={clsx('navigation-icon-right', 'navigation', navigationButtonClassName)}
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
