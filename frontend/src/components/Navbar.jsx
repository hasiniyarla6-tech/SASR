import { motion } from "framer-motion";
import { ShieldCheck, Activity } from "lucide-react";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
            <ShieldCheck size={28} color="white" />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              SASR AI
            </h1>

            <p className="text-xs text-slate-400">
              Smart Autonomous Search & Rescue
            </p>

          </div>

        </div>

        {/* Menu */}

        <div className="hidden md:flex gap-10 text-white font-medium">

          <a href="#" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#dashboard" className="hover:text-cyan-400 transition">
            Dashboard
          </a>

          <a href="#upload" className="hover:text-cyan-400 transition">
            Upload
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Analytics
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            About
          </a>

        </div>

        {/* Live Status */}

        <div className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full shadow-lg">

          <Activity size={18} />

          <span className="font-semibold">
            LIVE
          </span>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;