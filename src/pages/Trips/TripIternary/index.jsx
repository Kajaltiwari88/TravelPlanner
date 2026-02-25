import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ReusableButton from "../../../ReusableComponent/ReusableButton";
import TripMap from "../../../components/Trips/MapCheckPoints";
import TripExpenses from "../../../components/Trips/ExpenseTracker";
import AppCard from "../../../ReusableComponent/ReusableCards";
import TripWeather from "../../../components/Trips/TripWeather";
import { geoCodingApi } from "../../../utils/constants";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { getSingleTrip } from "../../../firebase/tripServices";

const sections = [
  { key: "weather", label: "Weather" },
  { key: "itinerary", label: "Itinerary" },
  { key: "map", label: "Map" },
  { key: "expenses", label: "Expenses" },
];

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [activeSection, setActiveSection] = useState("weather");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [loadingCoords, setLoadingCoords] = useState(false);
  const [loadingTrip, setLoadingTrip] = useState(true);

  useEffect(() => {
    if (!user?.uid || !id) return;

    const fetchTrip = async () => {
      try {
        const data = await getSingleTrip(user.uid, id);
        setTrip(data);
      } catch (err) {
        console.error("Failed to fetch trip", err);
      } finally {
        setLoadingTrip(false);
      }
    };

    fetchTrip();
  }, [user?.uid, id]);

  useEffect(() => {
    if (!trip?.destination) return;

    const fetchCoords = async () => {
      try {
        setLoadingCoords(true);

        const res = await fetch(
          `${geoCodingApi}?name=${trip.destination}&count=1`,
        );
        const data = await res.json();

        const location = data?.results?.[0];
        if (!location) return;

        setCoords({
          lat: location.latitude,
          lon: location.longitude,
        });
      } catch (err) {
        console.error("Geocoding failed", err);
      } finally {
        setLoadingCoords(false);
      }
    };

    fetchCoords();
  }, [trip?.destination]);

  if (loadingTrip) {
    return (
      <div className="p-10 text-center text-(--text-secondary)">
        Loading trip...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="p-10 text-center text-(--text-secondary)">
        Trip not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ReusableButton
        text="Back to Trips"
        variant="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/trips")}
        className="mb-3"
      />

      <h1 className="text-3xl font-semibold text-(--text-primary)">
        {trip.destination} Trip
      </h1>

      <p className="text-sm text-(--text-secondary) mt-1">
        {trip.days} Days • {trip.budget} Budget
      </p>

      <div className="flex gap-3 my-3 flex-wrap">
        {sections.map((section) => (
          <ReusableButton
            key={section.key}
            text={section.label}
            variant={activeSection === section.key ? "primary" : "secondary"}
            onClick={() => setActiveSection(section.key)}
          />
        ))}
      </div>

      {activeSection === "itinerary" && (
        <div className="space-y-4">
          <AppCard title="Trip Itinerary" subtitle={trip.itineraryText} />
        </div>
      )}

      {activeSection === "map" && <TripMap />}

      {activeSection === "expenses" && <TripExpenses />}

      {activeSection === "weather" && coords.lat && coords.lon && (
        <TripWeather
          destination={trip.destination}
          lat={coords.lat}
          lon={coords.lon}
          startDate={dayjs().format("YYYY-MM-DD")}
        />
      )}

      {activeSection === "weather" && loadingCoords && (
        <div className="text-center text-sm text-(--text-secondary)">
          Fetching location…
        </div>
      )}
    </div>
  );
};

export default TripDetail;
