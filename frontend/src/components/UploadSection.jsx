import { useState } from "react";
import StatsCard from "./StatsCard";

function UploadSection() {
  const [image, setImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);

  const [victims, setVictims] = useState(null);
  const [confidence, setConfidence] = useState([]);

  const [risk, setRisk] = useState("");
  const [mission, setMission] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  // Detection History
  const [history, setHistory] = useState([]);

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));

    setVictims(null);
    setConfidence([]);
    setDetectedImage(null);

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setLoading(false);

      setVictims(data.people_detected);
      setConfidence(data.confidence_scores);
      setRisk(data.risk_level);
      setMission(data.mission_status);
      setRecommendation(data.recommendation);

      setDetectedImage(
        `http://127.0.0.1:8000/${data.output_image}?t=${Date.now()}`
      );

      // Current Detection Time
      const currentTime = new Date().toLocaleString();

      setTime(currentTime);

      // Add Detection to History
      setHistory((prev) => [
        {
          time: currentTime,
          victims: data.people_detected,
          risk: data.risk_level,
          status: data.mission_status,
        },
        ...prev,
      ]);

    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Upload Failed");
    }
  };

  const averageConfidence =
    confidence.length > 0
      ? (
          confidence.reduce((a, b) => a + b, 0) /
          confidence.length
        ).toFixed(2)
      : 0;

  const riskColor =
    risk === "HIGH"
      ? "bg-red-600"
      : risk === "MEDIUM"
      ? "bg-orange-500"
      : "bg-green-600";

  return (
    <div className="bg-slate-900 text-white p-8 rounded-xl mt-10 shadow-xl">

      <h2 className="text-4xl font-bold mb-6">
        🚁 AI Disaster Image Analysis
      </h2>

      <label className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl cursor-pointer inline-block">
        📷 Choose Image

        <input
          type="file"
          className="hidden"
          onChange={handleImage}
        />
      </label>

      {loading && (
        <div className="mt-8">
          <div className="animate-pulse bg-blue-700 rounded-xl p-5 text-center text-xl font-bold">
            🤖 AI is analysing disaster image...
          </div>
        </div>
      )}

      {(image || detectedImage) && (
        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {image && (
            <div>
              <h2 className="text-2xl mb-3 font-bold">
                Original Image
              </h2>

              <img
                src={image}
                alt="Original"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          )}

          {detectedImage && (
            <div>
              <h2 className="text-2xl mb-3 font-bold">
                AI Detection
              </h2>

              <img
                src={detectedImage}
                alt="Detected"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          )}

        </div>
      )}

      {victims !== null && (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">

          <StatsCard
            title="👥 Victims"
            value={victims}
            color="bg-red-600"
          />

          <StatsCard
            title="🚨 Risk Level"
            value={risk}
            color={riskColor}
          />

          <StatsCard
            title="🛰 Mission"
            value={mission}
            color="bg-green-600"
          />

          <StatsCard
            title="🎯 Avg Confidence"
            value={`${averageConfidence}%`}
            color="bg-blue-600"
          />

        </div>
      )}

      {confidence.length > 0 && (
        <div className="bg-slate-800 mt-10 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-yellow-400 mb-5">
            🎯 Detection Confidence
          </h2>

          {confidence.map((score, index) => (

            <div key={index} className="mb-5">

              <div className="flex justify-between mb-2">
                <span>Victim {index + 1}</span>
                <span>{score}%</span>
              </div>

              <div className="bg-gray-700 rounded-full h-4">

                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${score}%` }}
                ></div>

              </div>

            </div>

          ))}

        </div>
      )}

      {recommendation && (
        <div className="bg-indigo-800 rounded-xl mt-10 p-6">

          <h2 className="text-2xl font-bold mb-3">
            🚑 AI Recommendation
          </h2>

          <p className="text-lg">
            {recommendation}
          </p>

        </div>
      )}

      {time && (
        <div className="bg-slate-800 mt-8 rounded-xl p-5">

          <h2 className="font-bold text-xl">
            🕒 Detection Time
          </h2>

          <p className="mt-2">
            {time}
          </p>

        </div>
      )}

      {/* Detection History */}

      {history.length > 0 && (
        <div className="bg-slate-800 mt-10 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-cyan-400 mb-5">
            📋 Detection History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-600">

                  <th className="py-3">Time</th>
                  <th>Victims</th>
                  <th>Risk</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {history.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-slate-700 hover:bg-slate-700"
                  >

                    <td className="py-3">{item.time}</td>
                    <td>{item.victims}</td>
                    <td>{item.risk}</td>
                    <td>{item.status}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

export default UploadSection;