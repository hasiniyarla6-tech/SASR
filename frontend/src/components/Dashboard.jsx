import { useEffect, useState } from "react";
import {
  Users,
  Plane,
  AlertTriangle,
  ShieldCheck,
  Activity,
  ArrowUpRight,
} from "lucide-react";

function Dashboard() {
  const [data, setData] = useState({
    victims: 0,
    drones: 0,
    alerts: 0,
    missions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Dashboard API failed");
        }

        return response.json();
      })
      .then((result) => {
        setData({
          victims: result.victims ?? 0,
          drones: result.drones ?? 0,
          alerts: result.alerts ?? 0,
          missions: result.missions ?? 0,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      title: "Victims Detected",
      value: data.victims,
      icon: Users,
      description: "People identified by AI",
    },
    {
      title: "Active Drones",
      value: data.drones,
      icon: Plane,
      description: "Rescue units available",
    },
    {
      title: "Critical Alerts",
      value: data.alerts,
      icon: AlertTriangle,
      description: "Situations requiring attention",
    },
    {
      title: "Missions",
      value: data.missions,
      icon: ShieldCheck,
      description: "Rescue missions initiated",
    },
  ];

  return (
    <section
      id="dashboard"
      className="relative overflow-hidden py-28 px-6 md:px-10"
      style={{
        background: `
          radial-gradient(
            circle at 10% 15%,
            rgba(139, 94, 60, 0.13),
            transparent 28%
          ),
          radial-gradient(
            circle at 90% 85%,
            rgba(176, 137, 104, 0.14),
            transparent 30%
          ),
          linear-gradient(
            135deg,
            #faf8f5 0%,
            #f4efe9 45%,
            #eee6dd 100%
          )
        `,
      }}
    >
      {/* Background decoration */}

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8b5e3c]/10 blur-[100px]" />

      <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-[#b08968]/10 blur-[120px]" />

      <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#6f4e37]/5 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="text-center mb-16">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-full
              bg-white/50
              backdrop-blur-xl
              border
              border-white/80
              shadow-[0_8px_30px_rgba(70,45,25,0.08)]
            "
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>

            <span className="text-xs md:text-sm font-bold tracking-[0.18em] text-[#6f4e37]">
              LIVE MISSION MONITORING
            </span>
          </div>

          <h2 className="mt-7 text-4xl md:text-6xl font-extrabold tracking-tight text-[#3d2b1f]">
            AI Mission
            <span className="text-[#8b5e3c]"> Dashboard</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-[#806b59]">
            Real-time disaster monitoring, AI-powered victim detection
            and intelligent rescue mission analytics.
          </p>

        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="flex justify-center py-16">

            <div
              className="
                flex
                items-center
                gap-4
                px-8
                py-5
                rounded-2xl
                bg-white/50
                backdrop-blur-xl
                border
                border-white/80
                shadow-[0_15px_40px_rgba(70,45,25,0.10)]
              "
            >

              <div
                className="
                  w-6
                  h-6
                  rounded-full
                  border-4
                  border-[#8b5e3c]/20
                  border-t-[#8b5e3c]
                  animate-spin
                "
              />

              <span className="font-semibold text-[#5a4030]">
                Loading mission data...
              </span>

            </div>

          </div>
        ) : (

          /* ================= CARDS ================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {cards.map((card, index) => {

              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    p-7
                    bg-white/45
                    backdrop-blur-2xl
                    border
                    border-white/80
                    shadow-[0_15px_45px_rgba(70,45,25,0.10)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:bg-white/60
                    hover:shadow-[0_25px_60px_rgba(70,45,25,0.16)]
                  "
                >

                  {/* Card glow */}

                  <div
                    className="
                      absolute
                      -top-16
                      -right-16
                      w-40
                      h-40
                      rounded-full
                      bg-[#8b5e3c]/10
                      blur-3xl
                      group-hover:bg-[#8b5e3c]/20
                      transition-all
                      duration-500
                    "
                  />

                  <div className="relative">

                    {/* Top row */}

                    <div className="flex items-center justify-between">

                      <div
                        className="
                          w-14
                          h-14
                          flex
                          items-center
                          justify-center
                          rounded-2xl
                          bg-[#8b5e3c]/10
                          border
                          border-[#8b5e3c]/15
                          text-[#6f4e37]
                          group-hover:scale-110
                          transition-transform
                          duration-300
                        "
                      >
                        <Icon size={27} strokeWidth={1.8} />
                      </div>

                      <ArrowUpRight
                        size={21}
                        className="
                          text-[#a88970]
                          opacity-50
                          group-hover:opacity-100
                          group-hover:text-[#6f4e37]
                          transition-all
                        "
                      />

                    </div>

                    {/* Title */}

                    <p
                      className="
                        mt-7
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[#806653]
                      "
                    >
                      {card.title}
                    </p>

                    {/* Number */}

                    <div className="mt-2">

                      <span className="text-5xl font-extrabold text-[#3d2b1f]">
                        {card.value}
                      </span>

                    </div>

                    {/* Description */}

                    <p className="mt-3 text-sm text-[#806b59]">
                      {card.description}
                    </p>

                    {/* Progress */}

                    <div className="mt-7">

                      <div className="h-1.5 w-full rounded-full bg-[#8b5e3c]/10 overflow-hidden">

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-[#6f4e37]
                            via-[#8b5e3c]
                            to-[#b08968]
                            transition-all
                            duration-700
                          "
                          style={{
                            width:
                              card.value > 0
                                ? `${Math.min(card.value * 10, 100)}%`
                                : "6%",
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* ================= SYSTEM STATUS ================= */}

        <div
          className="
            relative
            mt-10
            overflow-hidden
            rounded-[28px]
            bg-white/40
            backdrop-blur-2xl
            border
            border-white/80
            shadow-[0_15px_45px_rgba(70,45,25,0.10)]
          "
        >

          {/* Decorative glow */}

          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#8b5e3c]/10 blur-3xl" />

          <div className="relative p-7 md:p-9">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

              {/* Status information */}

              <div className="flex items-start gap-4">

                <div
                  className="
                    hidden
                    sm:flex
                    w-14
                    h-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#8b5e3c]/10
                    border
                    border-[#8b5e3c]/15
                  "
                >
                  <Activity
                    size={27}
                    className="text-[#6f4e37]"
                  />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-[#8b5e3c]">
                    System Status
                  </p>

                  <h3 className="mt-1 text-xl md:text-2xl font-bold text-[#3d2b1f]">
                    Autonomous Rescue Network
                  </h3>

                  <p className="mt-2 text-sm md:text-base text-[#806b59]">
                    AI detection and mission monitoring systems are operational.
                  </p>

                </div>

              </div>

              {/* Online indicator */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-full
                  bg-green-500/10
                  border
                  border-green-500/20
                  shadow-sm
                "
              >

                <span className="relative flex h-3 w-3">

                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />

                </span>

                <span className="font-bold text-green-700 tracking-wide">
                  SYSTEM ONLINE
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;