import { motion } from "framer-motion";
import { ArrowRight, UploadCloud } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-blue-500 opacity-20 blur-[140px] rounded-full -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-cyan-400 opacity-10 blur-[120px] rounded-full bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-8 py-28">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">

            Smart Autonomous

            <br />

            <span className="text-cyan-400">

              Search & Rescue System

            </span>

          </h1>

          <p className="text-slate-300 mt-8 text-xl max-w-3xl mx-auto">

            AI Powered Disaster Intelligence Platform that detects victims,
            analyses disaster severity and assists rescue teams with
            real-time recommendations.

          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg hover:scale-105">

              <ArrowRight size={22} />

              Start Mission

            </button>

            <button
              onClick={() =>
                document
                  .getElementById("upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg hover:scale-105"
            >

              <UploadCloud size={22} />

              Upload Image

            </button>

          </div>

        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mt-24"
        >

          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700">

            <h2 className="text-4xl font-bold text-cyan-400">
              AI
            </h2>

            <p className="mt-2 text-slate-300">
              Powered Detection
            </p>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700">

            <h2 className="text-4xl font-bold text-green-400">
              YOLOv8
            </h2>

            <p className="mt-2 text-slate-300">
              Victim Detection
            </p>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700">

            <h2 className="text-4xl font-bold text-orange-400">
              24×7
            </h2>

            <p className="mt-2 text-slate-300">
              Mission Monitoring
            </p>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700">

            <h2 className="text-4xl font-bold text-red-400">
              LIVE
            </h2>

            <p className="mt-2 text-slate-300">
              Emergency Response
            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;