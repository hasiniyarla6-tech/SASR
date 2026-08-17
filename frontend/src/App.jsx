import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import UploadSection from "./components/UploadSection";
import LiveDetection from "./components/LiveDetection";

function App() {
  return (
    <div className="min-h-screen bg-[#f5efe7]">

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Mission Dashboard */}
      <Dashboard />

      {/* Live AI Detection */}
      <div id="live-detection">
        <LiveDetection />
      </div>

      {/* Image Analysis */}
      <div
        id="upload"
        className="max-w-7xl mx-auto px-6 md:px-10 pb-24"
      >
        <UploadSection />
      </div>

    </div>
  );
}

export default App;