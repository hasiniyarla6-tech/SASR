function StatsCard({ title, value, color }) {
  return (
    <div
      className={`${color} rounded-xl p-6 shadow-xl hover:scale-105 transition duration-300`}
    >
      <h2 className="text-white text-lg font-semibold">
        {title}
      </h2>

      <p className="text-4xl font-bold text-white mt-3">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;