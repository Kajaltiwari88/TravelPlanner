import { Modal } from "antd";
import { useState } from "react";
import ReusableInput from "../../../ReusableComponent/ReusableInput";
import ReusableSelect from "../../../ReusableComponent/ReusableSelect";
import ReusableButton from "../../../ReusableComponent/ReusableButton";

const TripPlannerModal = ({ open, onClose, onSubmit, destination }) => {
  const [formData, setFormData] = useState({
    days: "",
    budget: "",
    interests: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    Number(formData?.days) > 0 &&
    Number(formData?.budget) > 0 &&
    Boolean(formData?.interests);

  const handleGenerate = () => {
    if (!isFormValid) return;

    onSubmit({
      destination,
      ...formData,
    });
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      closable={false}
      width={520}
      className="font-['Inter']!"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-(--text-primary)">
            Plan your trip
          </h2>
          <p className="text-sm text-(--text-secondary)">
            Share a few details so AI can build a better itinerary.
          </p>
        </div>

        <ReusableInput label="Destination" value={destination} disabled />

        <ReusableInput
          label="Number of days"
          name="days"
          type="number"
          placeholder="Enter number of days"
          value={formData?.days}
          onChange={handleInputChange}
        />

        <ReusableInput
          label="Budget"
          name="budget"
          type="number"
          placeholder="Enter your budget"
          value={formData?.budget}
          onChange={handleInputChange}
        />

        <ReusableSelect
          label="Travel interests"
          mode="multiple"
          value={formData?.interests}
          placeholder="Select interests"
          options={[
            { label: "Adventure", value: "adventure" },
            { label: "Nature", value: "nature" },
            { label: "Relax", value: "relax" },
            { label: "Culture", value: "culture" },
            { label: "Food", value: "food" },
          ]}
          onChange={(value) => handleSelectChange("interests", value)}
        />

        <ReusableButton
          text="✨ Generate Trip"
          className="h-12! rounded-2xl text-lg!"
          disabled={!isFormValid}
          onClick={handleGenerate}
        />

        <button
          onClick={onClose}
          className="text-sm text-(--text-secondary) text-center hover:underline cursor-pointer"
        >
          Skip & chat freely
        </button>
      </div>
    </Modal>
  );
};

export default TripPlannerModal;
