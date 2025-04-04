import React from "react";
import {
    format, startOfMonth, endOfMonth, startOfWeek,
    endOfWeek, eachDayOfInterval, isToday, isSameMonth, isSameDay,
    isAfter, isBefore
} from "date-fns";

import "./style.css";

interface CalendarProps {
    month: Date;
    startDate: Date | null;
    endDate: Date | null;
    onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ month, startDate, endDate, onDateSelect }) => {
    const firstDayOfMonth = startOfMonth(month);
    const lastDayOfMonth = endOfMonth(firstDayOfMonth);

    const firstDayGrid = startOfWeek(firstDayOfMonth);
    const lastDayGrid = endOfWeek(lastDayOfMonth);

    const days = eachDayOfInterval({ start: firstDayGrid, end: lastDayGrid });

    return (
        <div className="calendar">
            <h2 className="calendar-header">{format(firstDayOfMonth, "MMMM yyyy")}</h2>

            <div className="calendar-weekdays">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="calendar-weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-days">
                {days.map((day) => {
                    const isOutsideMonth = !isSameMonth(day, month);
                    const isSelected = !isOutsideMonth && ((startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate)));
                    const isInRange = !isOutsideMonth && startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate);

                    return (
                        <div
                            key={day.toString()}
                            className={`calendar-day 
                                ${isOutsideMonth ? "calendar-day-outside" : ""}
                                ${isToday(day) && !isOutsideMonth ? "calendar-day-today" : ""}
                                ${isSelected ? "calendar-day-selected" : ""}
                                ${isInRange ? "calendar-day-in-range" : ""}`}
                            onClick={() => !isOutsideMonth && onDateSelect(day)}
                        >
                            {format(day, "d")}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default Calendar;
