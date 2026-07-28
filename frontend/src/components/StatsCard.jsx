function StatsCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-lg ${color}`}>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-4xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}

export default StatsCard;