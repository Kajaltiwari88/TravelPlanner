const AppShimmer = ({ count = 3, height = 80, className = "" }) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            relative overflow-hidden
            rounded-2xl
            border border-(--input-border)
            bg-(--bg-soft)
            p-4
          "
          style={{ height }}
        >
          <div
            className="
              absolute inset-0
              -translate-x-full
              animate-[shimmer_1.5s_infinite]
              bg-linear-to-r
              from-transparent
              via-white/20
              to-transparent
            "
          />

          <div className="relative z-10 flex flex-col gap-3">
            <div className="h-4 w-1/3 rounded bg-(--input-bg)" />
            <div className="h-3 w-2/3 rounded bg-(--input-bg)" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppShimmer;
