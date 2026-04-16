import { CalendarOutlined, BankOutlined } from "@ant-design/icons";
import AppCard from "../../../ReusableComponent/ReusableCards";

const TripsSummary = ({ trip, onClick, onEdit, onDelete }) => {
  
  const menuItems = [
    {
      label: "✏️ Edit",
      onClick: () => onEdit?.(trip),
    },
    {
      label: "❌ Delete",
      onClick: () => onDelete?.(trip),
    },
  ];

  return (
    <AppCard
      onClick={onClick}
      title={trip?.destination}
      menuItems={menuItems}
      className="p-6"
    >
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
    </AppCard>
  );
};

export default TripsSummary;
