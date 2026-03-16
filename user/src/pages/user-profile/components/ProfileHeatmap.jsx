import React, { useState, useMemo } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

const allData = [
  { day: "2024-06-10", value: 2 },
  { day: "2024-12-20", value: 5 },
  { day: "2025-01-01", value: 1 },
  { day: "2025-01-05", value: 3 },
  { day: "2025-01-10", value: 7 },
];

export default function LeetCodeHeatmap() {
  const [year, setYear] = useState("current");
  const today = new Date();

  const { from, to, data } = useMemo(() => {
    if (year === "current") {
      const start = new Date(today);
      start.setFullYear(start.getFullYear() - 1);
      start.setDate(start.getDate() + 1);

      return {
        from: start.toISOString().slice(0, 10),
        to: today.toISOString().slice(0, 10),
        data: allData.filter((d) => {
          const dt = new Date(d.day);
          return dt >= start && dt <= today;
        }),
      };
    } else {
      const y = Number(year);
      return {
        from: `${y}-01-01`,
        to: `${y}-12-31`,
        data: allData.filter(
          (d) => new Date(d.day).getFullYear() === y
        ),
      };
    }
  }, [year]);

  return (
    <div style={{ height: 220, width: "100%", padding: 24 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Activity</h3>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="current">Last 12 Months</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <ResponsiveCalendar
        data={data}
        from={from}
        to={to}
        emptyColor="#ebedf0"
        colors={["#9be9a8", "#40c463", "#30a14e", "#216e39"]}
        margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={1}
        dayBorderColor="#ffffff"
        weekdayLegendOffset={-5}
      />
    </div>
  );
}