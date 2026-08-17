function StatsCard({ title, value, color }) {
  return (
    <div
      className={`
        ${color}
        rounded-2xl
        p-6
        text-white
        shadow-lg
        relative
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      `}
    >

      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/10" />

      <p className="text-sm font-medium text-white/80">
        {title}
      </p>

      <p className="text-3xl font-extrabold mt-3">
        {value}
      </p>

    </div>
  );
}

export default StatsCard;