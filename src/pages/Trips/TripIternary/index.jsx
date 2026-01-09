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

const trips = [
  { id: "1", destination: "Manali", days: 5, budget: "Medium" },
  { id: "2", destination: "Goa", days: 4, budget: "Low" },
  { id: "3", destination: "Udaipur", days: 3, budget: "High" },
];

const sections = [
  { key: "itinerary", label: "Itinerary" },
  { key: "map", label: "Map" },
  { key: "expenses", label: "Expenses" },
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
        variant="text"
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
          {Array.from({ length: trip.days }).map((_, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                bg-(--bg-soft)
                border border-(--input-border)
                p-5
              "
            >
              <h3 className="text-lg font-semibold text-(--text-primary)">
                Day {index + 1}
              </h3>

              <p className="mt-2 text-sm text-(--text-secondary)">
                • Sightseeing • Local food • Leisure & rest
              </p>
            </div>
          ))}
        </div>
      )}

      {activeSection === "map" && <TripMap />}

      {activeSection === "expenses" && <TripExpenses />}
    </div>
  );
};

export default TripDetail;
