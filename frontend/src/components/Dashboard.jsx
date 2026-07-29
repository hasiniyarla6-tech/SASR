import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Drone,
  TriangleAlert,
  ShieldCheck,
} from "lucide-react";

function Dashboard() {
  const [data, setData] = useState({
    victims: 0,
    drones: 0,
    alerts: 0,
    missions: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    {
      title: "Victims",
      value: data.victims,
      color: "from-red-500 to-red-700",
      icon: <Users size={34} />,
    },
    {
      title: "Drones",
      value: data.drones,
      color: "from-blue-500 to-cyan-600",
      icon: <Drone size={34} />,
    },
    {
      title: "Alerts",
      value: data.alerts,
      color: "from-orange-500 to-yellow-600",
      icon: <TriangleAlert size={34} />,
    },
    {
      title: "Missions",
      value: data.missions,
      color: "from-green-500 to-emerald-700",
      icon: <ShieldCheck size={34} />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-20 text-white">

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-4"
      >
        AI Mission Dashboard
      </motion.h2>

      <p className="text-center text-slate-400 text-lg mb-14">
        Real-time disaster monitoring and rescue mission analytics
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {cards.map((card, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.5,
            }}
            whileHover={{
              scale: 1.05,
            }}
            className={`bg-gradient-to-br ${card.color} rounded-3xl p-8 shadow-2xl`}
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-xl font-semibold">
                  {card.title}
                </h3>

                <h1 className="text-5xl font-bold mt-5">
                  {card.value}
                </h1>

              </div>

              <div className="opacity-90">
                {card.icon}
              </div>

            </div>

          </motion.div>

        ))}

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-slate-900 border border-slate-700 rounded-3xl p-8"
      >

        <h3 className="text-3xl font-bold mb-4 text-cyan-400">
          Mission Overview
        </h3>

        <p className="text-slate-300 leading-8 text-lg">
          The Smart Autonomous Search & Rescue System continuously
          monitors disaster scenes using Artificial Intelligence.
          Uploaded images are analysed to detect victims, estimate
          rescue priority, and assist emergency response teams with
          real-time mission recommendations.
        </p>

      </motion.div>

    </section>
  );
}

export default Dashboard;