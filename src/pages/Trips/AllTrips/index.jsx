import { useNavigate } from "react-router-dom";
import TripsSummary from "./../../../components/Trips/TripsSummary";
import { useEffect, useState } from "react";
import { deleteTrip, getUserTrips } from "../../../firebase/tripServices";
import { useAuth } from "../../../context/AuthContext";
import AppModal from "../../../ReusableComponent/AppModal";
import toast from "react-hot-toast";

const Trips = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteTrip = (trip) => {
    setDeleteTarget(trip || null);
  };

  const handleConfirmDelete = async () => {
    if (!user?.uid || !deleteTarget?.id) return;
    setIsDeleting(true);
    try {
      await deleteTrip(user?.uid, deleteTarget?.id);
      toast.success("Trip deleted successfully");
      setTrips((prev) => prev.filter((t) => t?.id !== deleteTarget?.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete trip");
    } finally {
      setIsDeleting(false);
    }
  };
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
            onDelete={handleDeleteTrip}
          />
        ))}
      </div>

      <AppModal
        open={Boolean(deleteTarget)}
        title="Delete Trip?"
        description={`This will permanently delete ${
          deleteTarget?.destination
        } trip.`}
        primaryText="Delete"
        secondaryText="Cancel"
        danger
        loading={isDeleting}
        onPrimary={handleConfirmDelete}
        onSecondary={() => setDeleteTarget(null)}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Trips;
