import React, { useState, useRef, useEffect } from "react";
import { addMonths, format } from "date-fns";
import Calendar from "../Calendar";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { useAnchorPosition } from "../../hooks"
import "./style.css";

interface DateRangeInputProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
    initialMonth?: Date;
    isOpen?: boolean;
    onToggle?: (open: boolean) => void;
    anchor?: "top" | "bottom" | "left" | "right";
    calendars?: number;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
    startDate,
    endDate,
    onChange,
    initialMonth = new Date(),
    isOpen: externalIsOpen,
    onToggle,
    anchor = "bottom",
    calendars = 2
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
        popupRef
    })

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

    const formatDate = (date: Date | null) => (date ? format(date, "MM/dd/yyyy") : "");

    const handleClear = () => {
        setInternalIsOpen(false)
        onChange({
            startDate: null,
            endDate: null
        })
    }

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

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, externalIsOpen, onToggle]);

    return (
        <div className="date-range-container">
            <div className="date-range-input">
                <button ref={inputRef} onClick={togglePopup}>
                    {startDate ? formatDate(startDate) : "Start Date"} - {endDate ? formatDate(endDate) : "End Date"}
                </button>
                <div className="separator" />
                <div className="close-icon" onClick={handleClear}>
                    <IoClose />
                </div>
            </div>


            {isOpen && (
                <div ref={popupRef} className={`date-range-popup anchor-${adjustedAnchor}`}>
                    <div className="calendar-container">
                        <button className="navigation-icon-left navigation" onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}><FaArrowLeft /></button>
                        {
                            Array.from({ length: calendars }).map((_, index) => (
                                <div key={index}>
                                    <Calendar month={addMonths(currentMonth, index)} startDate={startDate} endDate={endDate} onDateSelect={handleDateSelect} />
                                </div>
                            ))
                        }
                        <button className="navigation-icon-right navigation" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><FaArrowRight /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangeInput;