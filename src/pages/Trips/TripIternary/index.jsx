import { useParams } from "react-router-dom";

const trips = [
  { id: "1", destination: "Manali", days: 5, budget: "Medium" },
  { id: "2", destination: "Goa", days: 4, budget: "Low" },
  { id: "3", destination: "Udaipur", days: 3, budget: "High" },
];

const TripDetail = () => {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return <p className="p-10">Trip not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-(--text-primary)  font-semibold mb-4">
        {trip?.destination}
      </h1>

      <p className="mb-6 text-sm text-(--text-secondary)">
        {trip.days} days · {trip.budget} budget
      </p>

      {[...Array(trip.days)].map((_, i) => (
        <div key={i} className="mb-4 rounded-xl bg-(--bg-soft) p-4">
          <strong className="text-(--text-primary) ">Day {i + 1}</strong>
          <p className="text-sm text-(--text-secondary)">
            Sightseeing · Food · Leisure
          </p>
        </div>
      ))}
    </div>
  );
};

export default TripDetail;
