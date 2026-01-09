import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Confetti from "react-confetti";
import AIAssistant from "../../components/AIAssistant";
import TripPlannerModal from "../../components/Trips/TripPlannerForm";
import SuccessModal from "../../ReusableComponent/SuccessModal";

const AIPlanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { destination } = location.state || {};
  const [showModal, setShowModal] = useState(true);
  const [tripContext, setTripContext] = useState(null);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSkip = () => {
    setTripContext({ destination });
    setAutoGenerate(false);
    setShowModal(false);
  };

  const handleSubmitForm = (data) => {
    setTripContext(data);
    setAutoGenerate(true);
    setShowModal(false);
  };

  const handleItineraryGenerated = () => {
    setShowSuccessModal(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  return (
    <>
      <AIAssistant
        context={tripContext}
        autoGenerate={autoGenerate}
        onItineraryGenerated={handleItineraryGenerated}
      />

      {destination && (
        <TripPlannerModal
          open={showModal}
          destination={destination}
          onClose={handleSkip}
          onSubmit={handleSubmitForm}
        />
      )}

      {showConfetti && <Confetti numberOfPieces={250} />}

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Trip Itinerary Ready!"
        description="Your travel plan has been generated based on your preferences."
        buttonText="Go to Trip Section →"
        onAction={() => navigate("/trips")}
      />
    </>
  );
};

export default AIPlanner;
