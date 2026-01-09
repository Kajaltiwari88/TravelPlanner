const expenses = [
  { id: 1, title: "Hotel", amount: 4000 },
  { id: 2, title: "Taxi", amount: 800 },
  { id: 3, title: "Food", amount: 1000 },
];

const TripExpenses = () => {
  const total = expenses?.reduce((sum, e) => sum + e?.amount, 0);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-(--text-primary)">Total Spent: ₹{total}</h3>

      <div className="space-y-3">
        {expenses?.map((expense) => (
          <div
            key={expense?.id}
            className="
              rounded-xl
              bg-(--bg-soft)
              border border-(--input-border)
              p-4
              flex
              justify-between
              text-sm
              text-(--text-secondary)
            "
          >
            <span>{expense?.title}</span>
            <span>₹{expense?.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripExpenses;
