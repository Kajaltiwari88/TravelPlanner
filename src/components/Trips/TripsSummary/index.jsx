import { CalendarOutlined, BankOutlined } from "@ant-design/icons";

const TripsSummary = ({ trip, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-2xl
        bg-(--card)
        border border-(--input-border)
        p-6
        hover:shadow-lg
        transition
      "
    >
      <h2 className="text-xl text-(--text-primary) font-semibold">
        {trip?.destination}
      </h2>

      <div className="mt-4 text-sm text-(--text-secondary) space-y-2">
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-(--primary)" />
          {trip?.days} Days
        </div>

        <div className="flex items-center gap-2">
          <BankOutlined className="text-(--primary)" />
          {trip?.budget} Budget
        </div>
      </div>
    </div>
  );
};

export default TripsSummary;
