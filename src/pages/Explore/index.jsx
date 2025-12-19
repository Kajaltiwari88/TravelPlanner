import { typeIconMap } from "../../helpers/helpers";
import FeatureCard from "../../ReusableComponent/FeatureCards";
import ReusableButton from "../../ReusableComponent/ReusableButton";
import ReusableSearch from "../../ReusableComponent/ReusableSearch";

const Explore = () => {
  const destinations = [
    {
      id: "paris",
      name: "Paris",
      country: "France",
      tag: "Romantic • 3–5 days",
      type: "culture",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      tag: "Beach • 5–7 days",
      type: "beach",
      badge: "Trending",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    },
    {
      id: "rome",
      name: "Rome",
      country: "Italy",
      tag: "History • 3–5 days",
      type: "heritage",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRhbHl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      tag: "City • 5–7 days",
      type: "city",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFwYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "dubai",
      name: "Dubai",
      country: "UAE",
      tag: "Luxury • 3–5 days",
      type: "luxury",
      badge: "Luxury",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "goa",
      name: "Goa",
      country: "India",
      tag: "Beach • Weekend",
      type: "beach",
      badge: "Budget",
      image:
        "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200",
    },
    {
      id: "bangkok",
      name: "Bangkok",
      country: "Thailand",
      tag: "Budget • 3–5 days",
      type: "city",
      badge: "Budget",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200",
    },
    {
      id: "newyork",
      name: "New York",
      country: "USA",
      tag: "City • 5–7 days",
      type: "city",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "london",
      name: "London",
      country: "UK",
      tag: "Culture • 3–5 days",
      type: "culture",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=1200",
    },
    {
      id: "amsterdam",
      name: "Amsterdam",
      country: "Netherlands",
      tag: "Chill • Weekend",
      type: "city",
      badge: "Trending",
      image:
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200",
    },

    {
      id: "maldives",
      name: "Maldives",
      country: "Maldives",
      tag: "Luxury • 5–7 days",
      type: "luxury",
      badge: "Luxury",
      image:
        "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200",
    },
    {
      id: "singapore",
      name: "Singapore",
      country: "Singapore",
      tag: "Clean • 3–5 days",
      type: "city",
      badge: "Trending",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
    },
    {
      id: "istanbul",
      name: "Istanbul",
      country: "Turkey",
      tag: "Culture • 3–5 days",
      type: "culture",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
    },
    {
      id: "barcelona",
      name: "Barcelona",
      country: "Spain",
      tag: "Beach • 3–5 days",
      type: "beach",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhaW58ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "sydney",
      name: "Sydney",
      country: "Australia",
      tag: "Nature • 5–7 days",
      type: "nature",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1200",
    },
    {
      id: "seoul",
      name: "Seoul",
      country: "South Korea",
      tag: "Modern • 3–5 days",
      type: "city",
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=1200",
    },
    {
      id: "jaipur",
      name: "Jaipur",
      country: "India",
      tag: "Heritage • Weekend",
      type: "heritage",
      badge: "Budget",
      image:
        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFpcHVyfGVufDB8fDB8fHww",
    },
    {
      id: "capetown",
      name: "Cape Town",
      country: "South Africa",
      tag: "Nature • 5–7 days",
      type: "nature",
      badge: "Trending",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200",
    },
    {
      id: "zurich",
      name: "Zurich",
      country: "Switzerland",
      tag: "Luxury • 3–5 days",
      type: "luxury",
      badge: "Luxury",
      image:
        "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const cards = destinations?.map((place) => ({
    icon: typeIconMap[place?.type],
    title: `${place?.name}, ${place?.country}`,
    description: place?.tag,
    imageUrl: place?.image,
    // onClick: () => navigate(`/destination/${place?.id}`),
  }));

  return (
    <div className="px-6 py-6 flex flex-col gap-8 max-w-7xl mx-auto">
      <p className="text-2xl text-(--text-secondary)">
        Find places to plan your next trip
      </p>

      <div className="flex items-center justify-center gap-6">
        <ReusableSearch className="w-full max-w-4xl" />
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
        {cards.map((card, index) => (
          <FeatureCard key={index} slides={[card]} autoSlide interval={3000} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
