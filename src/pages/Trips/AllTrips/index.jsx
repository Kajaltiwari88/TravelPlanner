import { useNavigate } from "react-router-dom";
import TripsSummary from "./../../../components/Trips/TripsSummary";

const trips = [
  { id: "1", destination: "Manali", days: 5, budget: 1000 },
  { id: "2", destination: "Goa", days: 4, budget: 1000 },
  { id: "3", destination: "Udaipur", days: 3, budget: 1000},
];

const Trips = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-(--text-primary) font-semibold mb-6">
        Your Trips
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips?.map((trip) => (
          <TripsSummary
            key={trip?.id}
            trip={trip}
            onClick={() => navigate(`/trips/${trip?.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Trips;
