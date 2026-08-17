import { motion } from "framer-motion";
import { ArrowRight, UploadCloud, ShieldCheck, Radio, Scan, Activity } from "lucide-react";

function Hero() {
  const stats = [
    {
      icon: Scan,
      value: "AI",
      title: "Powered Detection",
    },
    {
      icon: ShieldCheck,
      value: "YOLOv8",
      title: "Victim Detection",
    },
    {
      icon: Radio,
      value: "24×7",
      title: "Mission Monitoring",
    },
    {
      icon: Activity,
      value: "LIVE",
      title: "Emergency Response",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f6f1e8] text-[#3b2a1f]">

      {/* Background decorative elements */}

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#b68b62]/20 blur-[120px] rounded-full" />

      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-[#8b6240]/15 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 left-1/3 w-[400px] h-[250px] bg-[#d6b28a]/20 blur-[100px] rounded-full" />

      {/* Decorative grid */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#5a3d29 1px, transparent 1px), linear-gradient(90deg, #5a3d29 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 py-28">

        {/* Main Hero */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          {/* Status */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-[#8b6240]/20 shadow-sm mb-8"
          >
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />

            <span className="text-sm font-semibold tracking-wide text-[#6b4b35]">
              AI RESCUE SYSTEM • LIVE
            </span>
          </motion.div>

          {/* Heading */}

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">

            Smart Autonomous

            <br />

            <span className="text-[#8b5e3c]">
              Search & Rescue System
            </span>

          </h1>

          {/* Description */}

          <p className="text-[#6b584a] mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            AI-powered disaster intelligence that detects victims,
            analyses disaster severity and provides real-time
            recommendations for faster and safer rescue operations.

          </p>

          {/* Buttons */}

          <div className="flex flex-wrap justify-center gap-5 mt-12">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-[#7a5235] hover:bg-[#68442c] text-white px-8 py-4 rounded-2xl text-lg font-semibold transition shadow-xl"
            >

              <ArrowRight size={22} />

              Start Mission

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-[#8b6240]/40 text-[#7a5235] hover:bg-[#7a5235] hover:text-white px-8 py-4 rounded-2xl text-lg font-semibold transition shadow-lg"
            >

              <UploadCloud size={22} />

              Upload Image

            </motion.button>

          </div>

        </motion.div>

        {/* Feature Cards */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid md:grid-cols-4 gap-5 mt-24"
        >

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="group bg-white/55 backdrop-blur-xl border border-[#8b6240]/15 rounded-3xl p-6 shadow-lg hover:shadow-xl transition"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-2xl bg-[#8b6240]/10 flex items-center justify-center">

                    <Icon
                      size={24}
                      className="text-[#8b6240]"
                    />

                  </div>

                  <span className="text-3xl font-extrabold text-[#7a5235]">
                    {item.value}
                  </span>

                </div>

                <p className="mt-5 text-[#6b584a] font-medium">
                  {item.title}
                </p>

              </motion.div>
            );

          })}

        </motion.div>

        {/* Bottom Information */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-[#806b5b]"
        >

          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-[#8b6240]" />
            Autonomous Detection
          </div>

          <div className="flex items-center gap-2">
            <Radio size={17} className="text-[#8b6240]" />
            Real-Time Monitoring
          </div>

          <div className="flex items-center gap-2">
            <Activity size={17} className="text-[#8b6240]" />
            Emergency Intelligence
          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;