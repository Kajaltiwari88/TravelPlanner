import { useEffect, useState } from "react";
import { destinations, typeIconMap } from "../../utils/helpers/helpers";
import FeatureCard from "../../ReusableComponent/FeatureCards";
import ReusableButton from "../../ReusableComponent/ReusableButton";
import ReusableSearch from "../../ReusableComponent/ReusableSearch";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../redux/reducers/explore";
import { useNavigate } from "react-router";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const { searchMain } = useSelector((state) => state.explore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = destinations?.map((place) => ({
    title: `${place?.name}, ${place?.country}`,
    description: place?.description,
    vibes: place?.vibes,
    imageUrl: place?.image,
    onClick: () =>
      navigate("/ai-assistant", {
        state: { destination: search || place?.name },
      }),
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredCards(cards);
      setNoMatch(false);
      setShowAIPlanner(false);
      return;
    }

    const filteredData = cards?.filter((item) =>
      item?.title?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
    );

    setFilteredCards(filteredData);
    setNoMatch(filteredData?.length === 0);

    setShowAIPlanner(false);
  }, [debouncedSearch]);

  const handleSearch = () => {
    dispatch(setSearchInput(search));

    if (noMatch && search?.trim()) {
      setShowAIPlanner(true);
    } else {
      setShowAIPlanner(false);
    }
  };
  const showHelperText =
    search?.trim()?.length > 0 && filteredCards?.length === 0 && !showAIPlanner;

  return (
    <div className="px-4 py-8 flex flex-col gap-8 max-w-7xl mx-auto">
      <p className="text-2xl text-(--text-secondary)">
        Find places to plan your next trip
      </p>

      <div className="flex items-center justify-center gap-6">
        <ReusableSearch
          className="w-full max-w-4xl"
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
          onSearch={handleSearch}
        />
        <span className="text-(--text-primary) text-2xl font-semibold">
          EXPLORE DESTINATIONS
        </span>
      </div>

      <div className="flex gap-4 justify-center">
        <ReusableButton
          text="Budget"
          className="w-[200px] min-h-14 rounded-2xl! text-xl!"
        />
        <ReusableButton
          text="Popular"
          className="w-[200px] min-h-14 rounded-2xl! text-xl!"
        />
        <ReusableButton
          text="Duration"
          className="w-[200px] min-h-14 rounded-2xl! text-xl!"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {showHelperText && (
          <p className="text-sm text-(--text-secondary) text-center">
            Looking for another place? Keep typing and press Enter to plan with
            AI
          </p>
        )}
        {showAIPlanner ? (
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl rounded-3xl border border-(--border) p-8 flex flex-col gap-6 bg-(--bg-secondary)">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-2xl font-semibold text-(--text-primary)">
                  Plan your trip to {search || searchMain}
                </h2>
                <p className="text-(--text-secondary)">
                  We couldn't find this destination in our featured list, but
                  our AI can create a personalized trip plan for you.
                </p>
              </div>

              <div className="flex justify-center">
                <ReusableButton
                  text={`✨ Plan ${search || searchMain} with AI`}
                  className="min-h-14 px-10 rounded-2xl text-lg!"
                  onClick={() => {
                    navigate("/ai-assistant", {
                      state: { destination: search },
                    });
                    console.log("Plan with AI:", search || searchMain);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          filteredCards?.map((card, index) => (
            <FeatureCard
              key={index}
              slides={[card]}
              autoSlide={false}
              interval={3000}
            />
          ))
        )}

      </div>
    </div>
  );
};

export default Explore;
