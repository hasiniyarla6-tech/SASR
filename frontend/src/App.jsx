import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import UploadSection from "./components/UploadSection";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <Hero />

      <div id="dashboard">
        <Dashboard />
      </div>

      <div
        id="upload"
        className="max-w-7xl mx-auto px-8 pb-20"
      >
        <UploadSection />
      </div>

    </div>
  );
}

export default App;