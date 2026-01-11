import { useEffect, useState } from "react";
import dayjs from "dayjs";

import AppDatePicker from "../../../ReusableComponent/ReusableDatePicker";
import ReusableButton from "../../../ReusableComponent/ReusableButton";
import AppCard from "../../../ReusableComponent/ReusableCards";
import { WeatherApi } from "../../../utils/constants";
import { WEATHER_MAP } from "../../../utils/helpers/helpers";
import AppShimmer from "../../../ReusableComponent/ReusableShimmer";

const DEFAULT_VISIBLE_DAYS = 10;

const TripWeather = ({
  destination,
  lat = 28.6139, // default Delhi
  lon = 77.209,
  startDate,
}) => {
  const [range, setRange] = useState([
    dayjs(startDate || dayjs()),
    dayjs(startDate || dayjs()).add(DEFAULT_VISIBLE_DAYS - 1, "day"),
  ]);
  const [unit, setUnit] = useState("C");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const tempUnit = unit === "C" ? "celsius" : "fahrenheit";

        const url = `${WeatherApi}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=${tempUnit}&timezone=auto`;

        const res = await fetch(url);
        const data = await res?.json();

        const formatted = data?.daily?.time
          .slice(0, DEFAULT_VISIBLE_DAYS)
          .map((date, index) => {
            const code = data?.daily?.weathercode?.[index];
            const weatherInfo = WEATHER_MAP?.[code] || {
              icon: "🌥️",
              label: "Unknown",
            };

            return {
              date,
              min: Math.round(data?.daily?.temperature_2m_min?.[index]),
              max: Math.round(data?.daily?.temperature_2m_max?.[index]),
              icon: weatherInfo?.icon,
              label: weatherInfo?.label,
            };
          });

        setWeather(formatted);
      } catch (err) {
        console.error("Weather fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, unit, range]);

  return (
    <div className="rounded-2xl bg-(--bg-soft) border border-(--input-border) p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            🌦️ Weather Forecast
          </h3>
          <p className="text-sm text-(--text-secondary)">{destination}</p>
        </div>

        <div className="flex items-center gap-3">
          <AppDatePicker
            type="range"
            value={range}
            allowClear={false}
            onChange={(dates) => setRange(dates)}
          />

          <ReusableButton
            text={unit === "C" ? "°C" : "°F"}
            variant="secondary"
            onClick={() => setUnit((prev) => (prev === "C" ? "F" : "C"))}
          />
        </div>
      </div>

      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
        {loading ? (
          <AppShimmer count={5} />
        ) : (
          weather?.map((day) => (
            <AppCard
              key={day?.date}
              title={dayjs(day.date).format("ddd, DD MMM")}
              subtitle={
                <div className="flex items-center gap-2">
                  <span className="text-xl">{day?.icon}</span>
                  <span className="text-sm">{day?.label}</span>
                </div>
              }
              rightContent={
                <span className="font-semibold text-(--text-secondary)">
                  {`${day?.max}° ${unit} / ${day?.min}°${unit}`}
                </span>
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TripWeather;
