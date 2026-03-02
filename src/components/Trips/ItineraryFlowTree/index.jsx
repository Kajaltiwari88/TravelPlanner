import { useState, useMemo } from "react";
import { CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./style.css";

const ItineraryFlowTree = ({ itineraryText = "", tripDays = 1 }) => {
  const [selectedDay, setSelectedDay] = useState(1);

  // Parse itinerary text into daily activities
  const parsedItinerary = useMemo(() => {
    if (!itineraryText) return {};

    const dayMap = {};
    const dayRegex = /Day\s+(\d+)\s*:?\s*([^]*?)(?=Day\s+\d+\s*:|$)/gi;
    let match;

    while ((match = dayRegex.exec(itineraryText)) !== null) {
      const dayNum = parseInt(match[1]);
      const content = match[2]
        .trim()
        .split("-")
        .map((item) => item.trim())
        .filter((item) => item && !item.match(/^Day\s+\d+/i));

      dayMap[dayNum] = {
        day: dayNum,
        activities: content,
      };
    }

    // If no days were parsed, create default structure
    if (Object.keys(dayMap).length === 0) {
      for (let i = 1; i <= tripDays; i++) {
        dayMap[i] = {
          day: i,
          activities: [`Day ${i} activities`],
        };
      }
    }

    return dayMap;
  }, [itineraryText, tripDays]);

  const dayNumbers = Object.keys(parsedItinerary)
    .map((d) => parseInt(d))
    .sort((a, b) => a - b);

  const currentDayData = parsedItinerary[selectedDay] || {
    day: selectedDay,
    activities: [],
  };

  const maxDay = dayNumbers[dayNumbers.length - 1] || tripDays;
  const progressPercent = (currentDayData.day / maxDay) * 100;

  return (
    <div className="grid grid-cols-[280px_1fr] gap-8 min-h-[600px] p-6 bg-(--bg-soft) rounded-xl border border-(--input-border)">
      {/* Left Side - Day Timeline */}
      <div className="pr-4 border-r-2 border-(--input-border) flex flex-col gap-6">
        <h3 className="text-lg font-semibold text-(--text-primary) p-0 m-0">Trip Days</h3>
        <div className="days-listz flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-2">
          {dayNumbers.map((dayNum, index) => (
            <div key={dayNum} className="relative">
              {/* Connector line */}
              {index < dayNumbers.length - 1 && (
                <div className="day-connector absolute left-5.5 top-10 w-0.5 h-6 bg-linear-to-b from-blue-500 to-(--input-border) z-1"></div>
              )}

              {/* Day node */}
              <div
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-lg transition-all duration-300 relative z-2 ${
                  selectedDay === dayNum
                    ? "bg-linear-to-br from-blue-500/20 to-blue-500/10 border-l-4 border-blue-500"
                    : "hover:bg-blue-500/10 hover:translate-x-1"
                }`}
                onClick={() => setSelectedDay(dayNum)}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 transition-all duration-300 ${
                    selectedDay === dayNum
                      ? "bg-blue-500 border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      : "bg-(--bg-hard) border-(--input-border) hover:border-blue-500"
                  }`}
                >
                  {selectedDay === dayNum && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-(--text-primary)">Day {dayNum}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Day Details */}
      <div className="flex flex-col gap-6 p-4 bg-(--bg-hard) rounded-lg animate-slideIn">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold">
            <CalendarOutlined />
            Day {currentDayData.day}
          </div>
          <h2 className="text-2xl font-bold text-(--text-primary) m-0">Daily Itinerary</h2>
        </div>

        {/* Activities List */}
        <div className="flex-1 min-h-[200px] p-4 bg-blue-500/5 border border-(--input-border) rounded-lg overflow-y-auto">
          {currentDayData.activities && currentDayData.activities.length > 0 ? (
            <ul className="list-none m-0 p-0 flex flex-col gap-4">
              {currentDayData.activities.map((activity, index) => (
                <li
                  key={index}
                  className="flex gap-4 items-start p-4 bg-(--bg-soft) rounded-lg border-l-4 border-blue-500 transition-all duration-200 hover:translate-x-1 hover:shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
                >
                  <span className="flex items-center text-blue-500 shrink-0 mt-0.5">
                    <CheckCircleOutlined className="w-1.5 h-1.5" />
                  </span>
                  <span className="text-(--text-secondary) text-sm leading-6">{activity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-(--text-secondary) py-8 italic">
              No activities planned for this day yet.
            </p>
          )}
        </div>

        {/* Day Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-(--text-primary)">Trip Progress</span>
            <span className="text-xs text-(--text-secondary)">
              Day {currentDayData.day} of {maxDay}
            </span>
          </div>
          <div className="w-full h-2 bg-(--input-border) rounded overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryFlowTree;
