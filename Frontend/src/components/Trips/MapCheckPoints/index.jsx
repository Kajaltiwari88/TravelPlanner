const checkpoints = [
  { id: 1, name: "Solang Valley" },
  { id: 2, name: "Hadimba Temple" },
  { id: 3, name: "Mall Road" },
];

const TripMap = () => {
  return (
    <div className="rounded-2xl bg-(--bg-soft) border border-(--input-border) p-6">
      <h3 className="text-lg font-semibold text-(--text-primary) mb-3">
        Map Checkpoints
      </h3>

      <div className="space-y-2 text-sm">
        {checkpoints?.map((point) => (
          <div key={point?.id} className="flex items-center text-(--text-secondary) gap-2">
            📍 <span>{point?.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 h-40 rounded-xl bg-gray-200 flex items-center justify-center text-sm text-gray-600">
        Map integration coming soon
      </div>
    </div>
  );
};

export default TripMap;
