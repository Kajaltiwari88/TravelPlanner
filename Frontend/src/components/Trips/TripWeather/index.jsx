import { useEffect, useState } from "react";
import dayjs from "dayjs";

import AppDatePicker from "../../../ReusableComponent/ReusableDatePicker";
import ReusableButton from "../../../ReusableComponent/ReusableButton";
import AppCard from "../../../ReusableComponent/ReusableCards";
import { WeatherApi } from "../../../utils/constants";
import { WEATHER_MAP } from "../../../utils/helpers/helpers";
import AppShimmer from "../../../ReusableComponent/ReusableShimmer";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import toast from "react-hot-toast";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const FORECAST_DAYS = 12;
const MAX_SELECTABLE_DAYS = 11;

const TripWeather = ({ destination, lat = 28.6139, lon = 77.209 }) => {
  const [range, setRange] = useState([
    dayjs(),
    dayjs()?.add(MAX_SELECTABLE_DAYS - 1, "day"),
  ]);
  const [unit, setUnit] = useState("C");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);

        const tempUnit = unit === "C" ? "celsius" : "fahrenheit";
        const url = `${WeatherApi}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=${FORECAST_DAYS}&temperature_unit=${tempUnit}&timezone=auto`;

        const res = await fetch(url);
        const data = await res?.json();

        const formatted =
          data?.daily?.time?.map((date, index) => {
            const code = data?.daily?.weathercode?.[index];
            const info = WEATHER_MAP?.[code] || {
              icon: "🌥️",
              label: "Unknown",
            };

            return {
              date,
              min: Math.round(data?.daily?.temperature_2m_min?.[index] ?? 0),
              max: Math.round(data?.daily?.temperature_2m_max?.[index] ?? 0),
              icon: info?.icon,
              label: info?.label,
            };
          }) || [];

        setWeather(formatted);
      } catch (err) {
        console.error("Weather fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, unit]);

  const disabledDate = (current) => {
    if (!current) return false;
    return current?.isBefore(dayjs()?.startOf("day"));
  };

  const handleRangeChange = (dates) => {
    if (!dates?.[0] || !dates?.[1]) return;

    const daysSelected = dates?.[1]?.diff(dates?.[0], "day") + 1;

    if (daysSelected > MAX_SELECTABLE_DAYS) {
      toast.error("You can select maximum 10 days only");
      return;
    }

    setRange(dates);
  };

  const filteredWeather =
    weather?.filter((day) => {
      const d = dayjs(day?.date);
      return (
        d?.isSameOrAfter(range?.[0], "day") &&
        d?.isSameOrBefore(range?.[1], "day")
      );
    }) || [];

  return (
    <div className="rounded-2xl bg-(--bg-soft) border border-(--input-border) p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            🌦️ Weather Forecast
          </h3>
          <p className="text-sm text-(--text-secondary)">{destination ?? ""}</p>
        </div>

        <div className="flex items-center gap-3">
          <AppDatePicker
            type="range"
            value={range}
            allowClear={false}
            disabledDate={disabledDate}
            onChange={handleRangeChange}
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
          filteredWeather?.map((day) => (
            <AppCard
              key={day?.date}
              title={dayjs(day?.date)?.format("ddd, DD MMM")}
              subtitle={
                <div className="flex items-center gap-2">
                  <span className="text-xl">{day?.icon}</span>
                  <span className="text-sm">{day?.label}</span>
                </div>
              }
              rightContent={
                <span className="font-semibold text-(--text-secondary)">
                  {`${day?.max}°${unit} / ${day?.min}°${unit}`}
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
