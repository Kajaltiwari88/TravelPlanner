import { useNavigate } from "react-router-dom";
import FeatureCard from "../../ReusableComponent/FeatureCards";
import ReusableButton from "../../ReusableComponent/ReusableButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import AppModal from "../../ReusableComponent/AppModal";
import {
  AIImageURL,
  ExpenseTrackImg,
  ExploreDestImg,
  MapAndCheckPointImg,
  SavedTrips,
} from "../../utils/constants";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const slides = [
    {
      icon: "🧠",
      title: "AI Trip Planner",
      description: "Get personalized day-by-day itineraries in seconds",
      imageUrl: AIImageURL,
      onClick: () => navigate("/ai-assistant"),
    },
    {
      icon: "🗺️",
      title: "Smart Maps & Checkpoints",
      description: "Visualize routes, checkpoints, and optimize travel paths",
      imageUrl: MapAndCheckPointImg,
      onClick: () => navigate("/trips"),
    },
    {
      icon: "💰",
      title: "Expense Tracker",
      description: "Track travel expenses and stay within your budget",
      imageUrl: ExpenseTrackImg,
      onClick: () => navigate("/trips"),
    },
    {
      icon: "🧭",
      title: "Explore Destinations",
      description: "Discover popular places, attractions, and travel ideas",
      imageUrl: ExploreDestImg,
      onClick: () => navigate("/explore"),
    },
    {
      icon: "💾",
      title: "Saved Trips",
      description: "Access, edit, and reuse your trips anytime",
      imageUrl: SavedTrips,
      onClick: () => navigate("/trips"),
    },
  ];

  return (
    <div className="px-6 md:px-16 flex flex-col gap-3 overflow-y-hidden">
      <p className="text-2xl text-(--text-secondary) my-2">
        Plan smarter. Travel better. Powered by AI.
      </p>

      <FeatureCard slides={slides} autoSlide interval={3000} />

      <ReusableButton
        text={"Get Started"}
        onClick={() => (user ? navigate("/explore") : setIsModalVisible(true))}
        className="w-[200px] min-h-14 self-center rounded-2xl! text-xl!"
      />
      {
        <AppModal
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          secondaryText={"Cancel"}
          primaryText={"Login"}
          onPrimary={() => navigate("/auth")}
          onSecondary={() => setIsModalVisible(false)}
          title="Login to unlock Smart Travel ✨"
          description="Sign in to explore personalized trip planning, AI recommendations, and save your journeys for later."
        />
      }
    </div>
  );
};

export default Home;
