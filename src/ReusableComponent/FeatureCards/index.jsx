import { useEffect } from "react";
import { useState } from "react";

const FeatureCard = ({ slides = [], autoSlide = true, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides?.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides?.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-linear-to-r from-black/70 via-black/40 to-black/10">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {slides?.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-[500px] relative cursor-pointer"
            onClick={slide?.onClick}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-black/70"
              style={{ backgroundImage: `url(${slide?.imageUrl})` }}
            />

            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="text-4xl mb-3">{slide?.icon}</div>
              <h2 className="text-3xl font-bold text-(--btn-primary-text) mb-2">
                {slide?.title}
              </h2>
              <p className="text-lg text-[#EEEEEE] max-w-lg">
                {slide?.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {autoSlide && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 cursor-pointer">
          {slides?.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
