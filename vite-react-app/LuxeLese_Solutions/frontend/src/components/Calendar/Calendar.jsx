import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ onDateSelect, selectedDates = [], className }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(selectedDate);
  };

  const isDateSelected = (day) => {
    return selectedDates.some(date => {
      const d = new Date(date);
      return d.getDate() === day && 
             d.getMonth() === currentMonth.getMonth() && 
             d.getFullYear() === currentMonth.getFullYear();
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const selected = isDateSelected(day);
      const today = isToday(day);
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${selected ? 'selected' : ''} ${today ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`calendar-container ${className}`}>
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <h3 className="calendar-month-year">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={handleNextMonth} className="calendar-nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="calendar-days">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
