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
}

const Input: React.FC<InputProps> = ({
  inputRef,
  togglePopup,
  startDate,
  endDate,
  handleClear,
}) => {
  return (
    <div className="date-range-input">
      <button ref={inputRef} onClick={togglePopup}>
        {startDate ? formatDate(startDate) : 'Start Date'} -{' '}
        {endDate ? formatDate(endDate) : 'End Date'}
      </button>
      <div className="separator" />
      <div className="close-icon" onClick={handleClear}>
        <IoClose />
      </div>
    </div>
  );
};

export default Input;
