import React from 'react';
import { IoClose } from 'react-icons/io5';
import { formatDate } from '../../utils';
import './style.css';

interface InputProps {
  inputRef: React.RefObject<HTMLButtonElement | null>;
  startDate: Date | null;
  endDate: Date | null;
  handleClear(): void;
  togglePopup(): void;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
}

const Input: React.FC<InputProps> = ({
  inputRef,
  togglePopup,
  startDate,
  endDate,
  handleClear,
  startDatePlaceholder = 'Start Date',
  endDatePlaceholder = 'End Date',
}) => {
  return (
    <div className="date-range-input">
      <button ref={inputRef} onClick={togglePopup}>
        {startDate ? formatDate(startDate) : startDatePlaceholder} -{' '}
        {endDate ? formatDate(endDate) : endDatePlaceholder}
      </button>
      <div className="close-container">
        <div className="separator" />
        <div className="close-icon" onClick={handleClear} data-testid="close-icon">
          <IoClose />
        </div>
      </div>
    </div>
  );
};

export default Input;
