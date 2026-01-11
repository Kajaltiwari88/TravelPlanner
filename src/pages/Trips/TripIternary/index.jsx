import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  EditOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import ReusableButton from "../../../ReusableComponent/ReusableButton";
import TripMap from "../../../components/Trips/MapCheckPoints";
import TripExpenses from "../../../components/Trips/ExpenseTracker";
import AppCard from "../../../ReusableComponent/ReusableCards";
import TripWeather from "../../../components/Trips/TripWeather";

const trips = [
  { id: "1", destination: "Manali", days: 5, budget: "Medium" },
  { id: "2", destination: "Goa", days: 4, budget: "Low" },
  { id: "3", destination: "Udaipur", days: 3, budget: "High" },
];

const sections = [
  { key: "itinerary", label: "Itinerary" },
  { key: "map", label: "Map" },
  { key: "expenses", label: "Expenses" },
  { key: "weather", label: "Weather" },
];

const headerActions = [
  {
    key: "edit",
    text: "Edit Trip",
    icon: <EditOutlined />,
    onClick: () => console.log("Edit trip"),
  },
  {
    key: "share",
    text: "Share",
    icon: <ShareAltOutlined />,
    onClick: () => console.log("Share trip"),
  },
];

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("itinerary");

  const trip = trips.find((t) => t.id === id);

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

      <div className="flex gap-3 mt-5 mb-8">
        {headerActions.map((action) => (
          <ReusableButton
            key={action.key}
            text={action.text}
            icon={action.icon}
            variant="secondary"
            onClick={action.onClick}
          />
        ))}
      </div>

      <div className="flex gap-3 mb-8">
        {sections?.map((section) => (
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
          {Array?.from({ length: trip.days }).map((_, index) => (
            <AppCard
              key={index}
              title={`Day ${index + 1}`}
              subtitle={`Sightseeing • Local food • Leisure & rest`}
              onClick={() => navigate(`/trips/${trip.id}`)}
            >
              {/* <p className="text-sm text-(--text-secondary)">
                Click to view full itinerary, weather, map & expenses.
              </p> */}
            </AppCard>
          ))}
        </div>
      )}

      {activeSection === "map" && <TripMap />}
      {activeSection === "expenses" && <TripExpenses />}
      {activeSection === "weather" && <TripWeather />}
    </div>
  );
};

export default TripDetail;
