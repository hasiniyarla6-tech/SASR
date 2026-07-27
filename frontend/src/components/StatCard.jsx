function StatCard({ title, value, color }) {
  return (
    <div className={`${color} p-6 rounded-xl shadow-lg text-white`}>

      <h3 className="text-xl">
        {title}
      </h3>

      <p className="text-5xl font-bold mt-4">
        {value}
      </p>

    </div>
  );
}

export default StatCard;