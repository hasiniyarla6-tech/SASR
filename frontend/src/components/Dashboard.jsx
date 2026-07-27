import StatCard from "./StatCard";

function Dashboard() {
  return (
    <section className="bg-slate-900 min-h-screen p-10">

      <h2 className="text-4xl text-white font-bold mb-8">
        Mission Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-6">

        <StatCard
          title="Victims Detected"
          value="24"
          color="bg-red-500"
        />

        <StatCard
          title="Drones Active"
          value="8"
          color="bg-blue-500"
        />

        <StatCard
          title="Alerts"
          value="5"
          color="bg-yellow-500"
        />

        <StatCard
          title="Missions"
          value="12"
          color="bg-green-500"
        />

      </div>

    </section>
  );
}

export default Dashboard;