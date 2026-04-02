import React, { useState, useMemo, useRef, useEffect } from "react";
import { OverlayTrigger, Tooltip as BSTooltip } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const generateDummyData = () => {
    const data = [];
    const end = new Date();
    const start = new Date();
    start.setFullYear(start.getFullYear() - 3); 
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (Math.random() < 0.12) { 
            data.push({
                day: d.toISOString().slice(0, 10),
                value: Math.floor(Math.random() * 4) + 1 
            });
        }
    }
    return data;
}

const mockData = generateDummyData();

export default function ProfileHeatmap() {
  const [year, setYear] = useState("2023"); // defaulting to 2023 to match image selection
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();

  const { data, monthsData, stats } = useMemo(() => {
    let startDate;
    let endDate;

    if (year === "Current") {
      endDate = new Date(today);
      startDate = new Date(today);
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setDate(startDate.getDate() + 1);
    } else {
      const y = Number(year);
      startDate = new Date(Date.UTC(y, 0, 1));
      endDate = new Date(Date.UTC(y, 11, 31));
    }

    const start = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    const end = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

    const filteredData = mockData.filter(d => {
      const dt = new Date(d.day);
      return dt >= start && dt <= end;
    });

    const dataMap = {};
    filteredData.forEach(d => {
      dataMap[d.day] = d.value;
    });

    let totalLeaves = 0;
    let totalActiveDays = 0;
    let currentStreak = 0;
    let maxStreak = 0;

    let dIter = new Date(start);
    while (dIter <= end) {
      const dateStr = dIter.toISOString().slice(0, 10);
      const val = dataMap[dateStr] || 0;
      if (val > 0) {
        totalLeaves += val;
        totalActiveDays += 1;
        currentStreak += 1;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
      dIter.setUTCDate(dIter.getUTCDate() + 1);
    }

    // Generate grouped by month
    const groupedMonths = [];
    let currM = new Date(start);
    currM.setUTCDate(1); 

    while (currM <= end || (currM.getUTCFullYear() === end.getUTCFullYear() && currM.getUTCMonth() === end.getUTCMonth())) {
      const mYear = currM.getUTCFullYear();
      const mMonth = currM.getUTCMonth();
      const monthName = currM.toLocaleString('default', { month: 'short' });
      
      const weeks = [];
      let d = new Date(Date.UTC(mYear, mMonth, 1));
      let currentWeek = new Array(7).fill(null);
      
      for (let i = 0; i < d.getUTCDay(); i++) {
        currentWeek[i] = null;
      }
      
      while (d.getUTCMonth() === mMonth && d <= end) {
        if (d >= start && d <= end) {
          const dateStr = d.toISOString().slice(0, 10);
          const val = dataMap[dateStr] || 0;
          currentWeek[d.getUTCDay()] = { date: dateStr, value: val };
        } else {
          currentWeek[d.getUTCDay()] = null; 
        }
        
        let nextDay = new Date(d);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);
        
        if (d.getUTCDay() === 6 || nextDay.getUTCMonth() !== mMonth || d.getTime() === end.getTime()) {
          weeks.push(currentWeek);
          currentWeek = new Array(7).fill(null);
        }
        d = nextDay;
      }
      
      groupedMonths.push({ monthName, weeks });
      currM.setUTCMonth(currM.getUTCMonth() + 1);
    }

    // Remove empty months (e.g. if start was late in a month)
    const activeMonths = groupedMonths.filter(m => m.weeks.length > 0 && m.weeks.some(w => w.some(day => day !== null)));

    return { 
      data: filteredData, 
      monthsData: activeMonths, 
      stats: { totalLeaves, totalActiveDays, maxStreak }
    };
  }, [year]);

  const getColor = (value) => {
    if (value === 0) return "var(--bs-border-color, #ebedf0)"; // fallback to light gray for light mode
    if (value === 1) return "#0e4429";
    if (value === 2) return "#006d32";
    if (value === 3) return "#26a641";
    return "#39d353";
  };

  const yearsOptions = ["Current", "2025", "2024", "2023"];

  return (
    <div className="card border-0 shadow-sm" style={{ padding: '24px', borderRadius: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-3">
        <div className="d-flex align-items-center gap-2">
          <span className="fs-5 fw-bold text-body">{stats.totalLeaves}</span> 
          <span className="text-secondary">leaves in the past one year</span>
          <IconifyIcon icon="bx:info-circle" className="text-muted ms-1" style={{ cursor: 'help' }} />
        </div>

        <div className="d-flex align-items-center gap-4 text-secondary" style={{ fontSize: '14px' }}>
          <span>Total active days: <strong className="text-body fw-bold">{stats.totalActiveDays}</strong></span>
          <span>Max streak: <strong className="text-body fw-bold">{stats.maxStreak}</strong></span>
          
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button 
              className="btn btn-sm d-flex align-items-center gap-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                backgroundColor: 'var(--bs-tertiary-bg, #f6f8fa)', 
                color: 'var(--bs-body-color, #24292f)', 
                border: '1px solid var(--bs-border-color)', 
                borderRadius: '6px', 
                padding: '4px 12px', 
                fontWeight: '500'
              }}
            >
              {year} <IconifyIcon icon="bx:chevron-down" />
            </button>
            {dropdownOpen && (
              <div 
                className="dropdown-menu show shadow-sm"
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '6px',
                  borderRadius: '8px', zIndex: 10, minWidth: '130px', padding: '6px 0',
                  border: '1px solid var(--bs-border-color, #e1e4e8)'
                }}
              >
                {yearsOptions.map(y => (
                  <button 
                    key={y}
                    className="dropdown-item d-flex align-items-center justify-content-between text-body"
                    onClick={() => { setYear(y); setDropdownOpen(false); }}
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    {y}
                    {year === y && <IconifyIcon icon="bx:check" style={{ color: '#39d353', fontSize: '16px' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grouped Month Grid Wrapper */}
      <div className="w-100" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div className="d-flex" style={{ gap: '16px', minWidth: 'max-content' }}>
          {monthsData.map((month, mIndex) => (
            <div key={mIndex} className="d-flex flex-column" style={{ gap: '8px' }}>
              <div className="d-flex" style={{ gap: '4px' }}>
                {month.weeks.map((week, wIndex) => (
                  <div key={wIndex} className="d-flex flex-column" style={{ gap: '4px' }}>
                    {week.map((day, dIndex) => {
                      if (!day) return <div key={dIndex} style={{ width: '13px', height: '13px', borderRadius: '2px', backgroundColor: 'transparent' }} />;
                      
                      return (
                        <OverlayTrigger
                          key={dIndex}
                          placement="top"
                          overlay={
                            <BSTooltip id={`tooltip-${day.date}`}>
                              <strong>{day.value > 0 ? `${day.value} leave${day.value > 1 ? 's' : ''}` : 'No leaves'}</strong> on {day.date}
                            </BSTooltip>
                          }
                        >
                          <div 
                            style={{
                              width: '13px', height: '13px', 
                              backgroundColor: getColor(day.value),
                              borderRadius: '2px', cursor: 'pointer',
                              border: day.value === 0 ? '1px solid rgba(128,128,128,0.1)' : 'none'
                            }} 
                          />
                        </OverlayTrigger>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="text-muted" style={{ fontSize: '12px' }}>
                {month.monthName}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}