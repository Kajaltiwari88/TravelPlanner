import { useNavigate } from "react-router-dom";
import FeatureCard from "../../ReusableComponent/FeatureCards";
import ReusableButton from "../../ReusableComponent/ReusableButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import AppModal from "../../ReusableComponent/AppModal";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const slides = [
    {
      icon: "🧠",
      title: "AI Trip Planner",
      description: "Get personalized day-by-day itineraries in seconds",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=363&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      onClick: () => navigate("/trip/customize"),
    },
    {
      icon: "🗺️",
      title: "Smart Maps & Checkpoints",
      description: "Visualize routes, checkpoints, and optimize travel paths",
      imageUrl:
        "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1400",
      onClick: () => navigate("/trips"),
    },
    {
      icon: "💰",
      title: "Expense Tracker",
      description: "Track travel expenses and stay within your budget",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400",
      onClick: () => navigate("/trips"),
    },
    {
      icon: "🧭",
      title: "Explore Destinations",
      description: "Discover popular places, attractions, and travel ideas",
      imageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400",
      onClick: () => navigate("/explore"),
    },
    {
      icon: "💾",
      title: "Saved Trips",
      description: "Access, edit, and reuse your trips anytime",
      imageUrl:
        "https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1400",
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
