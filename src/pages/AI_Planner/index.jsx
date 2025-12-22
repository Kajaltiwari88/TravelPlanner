import { useState } from "react";
import { useLocation } from "react-router";
import AIAssistant from "../../components/AIAssistant";
import TripPlannerModal from "../../components/TripPlannerForm";

const AIPlanner = () => {
  const location = useLocation();
  const { destination } = location.state || {};

  const [showModal, setShowModal] = useState(true);
  const [tripContext, setTripContext] = useState(null);
  const [autoGenerate, setAutoGenerate] = useState(false);

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

  return (
    <div className="py-6">
      <AIAssistant context={tripContext} autoGenerate={autoGenerate} />

      {destination && (
        <TripPlannerModal
          open={showModal}
          destination={destination}
          onClose={handleSkip}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
};

export default AIPlanner;
