import React, { useState, useRef, useEffect } from "react";
import { addMonths, format } from "date-fns";
import Calendar from "../Calendar";
import "./style.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

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

interface DateRangeInputProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
    initialMonth?: Date;
    isOpen?: boolean;
    onToggle?: (open: boolean) => void;
    anchor?: "top" | "bottom" | "left" | "right";
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
    startDate,
    endDate,
    onChange,
    initialMonth = new Date(),
    isOpen: externalIsOpen,
    onToggle,
    anchor = "bottom",
    calendars = 3
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLButtonElement | null>(null);
    const [adjustedAnchor, setAdjustedAnchor] = useState(anchor);

    const isOpen = externalIsOpen ?? internalIsOpen;

    useEffect(() => {
        if (!isOpen || !popupRef.current || !inputRef.current) return;

        const popup = popupRef.current;
        const input = inputRef.current;
        const rect = input.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newAnchor = anchor;

        if (anchor === "left" && rect.left < popup.offsetWidth) {
            newAnchor = "right";
        } else if (anchor === "right" && rect.right + popup.offsetWidth > viewportWidth) {
            newAnchor = "left";
        } else if (anchor === "top" && rect.top < popup.offsetHeight) {
            newAnchor = "bottom";
        } else if (anchor === "bottom" && rect.bottom + popup.offsetHeight > viewportHeight) {
            newAnchor = "top";
        }

        setAdjustedAnchor(newAnchor);
    }, [isOpen, anchor]);

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

    return (
        <div className="date-range-container">
            <div>

                <button ref={inputRef} className="date-range-input" onClick={togglePopup}>
                    {startDate ? formatDate(startDate) : "Start Date"} - {endDate ? formatDate(endDate) : "End Date"}
                </button>
            </div>


            {isOpen && (
                <div ref={popupRef} className={`date-range-popup anchor-${adjustedAnchor}`}>
                    <div className="calendar-navigation">
                        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}><FaArrowLeft /></button>
                        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><FaArrowRight /></button>
                    </div>

                    <div className="calendar-container">
                        {
                            Array.from({ length: calendars }).map((_, index) => (
                                <div key={index}>
                                    <Calendar month={addMonths(currentMonth, index)} startDate={startDate} endDate={endDate} onDateSelect={handleDateSelect} />
                                    {/* <div className="calendar-separator" /> */}
                                </div>
                            ))
                        }

                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangeInput;