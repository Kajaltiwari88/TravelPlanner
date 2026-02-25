import { useNavigate } from "react-router-dom";
import TripsSummary from "./../../../components/Trips/TripsSummary";
import { useEffect, useState } from "react";
import { getUserTrips } from "../../../firebase/tripServices";
import { useAuth } from "../../../context/AuthContext";

const Trips = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchTrips = async () => {
      try {
        const data = await getUserTrips(user?.uid);
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      }
    };

    fetchTrips();
  }, [user?.uid]);
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
