import { useState } from "react";
import StatsCard from "./StatsCard";
function UploadSection() {

  const [image, setImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [victims, setVictims] = useState(null);
  const [confidence, setConfidence] = useState([]);
  const handleImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // Preview selected image
    setImage(URL.createObjectURL(file));

    // Create form data
    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      setVictims(data.people_detected);
      setConfidence(data.confidence_scores);
      // Add timestamp so browser doesn't use old cached image
      setDetectedImage(
        `http://127.0.0.1:8000/${data.output_image}?t=${Date.now()}`
      );

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (

    <div className="bg-slate-900 p-8 rounded-xl mt-10 text-white">

      <h2 className="text-3xl font-bold mb-6">
        Upload Disaster Image
      </h2>

      <input
        type="file"
        onChange={handleImage}
      />

      {image && (
        <div className="mt-6">
          <h3 className="text-xl mb-2">Original Image</h3>

          <img
            src={image}
            alt="Preview"
            className="w-96 rounded-lg shadow-lg"
          />
        </div>
      )}

      {victims !== null && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

    <StatsCard
      title="👥 Victims Detected"
      value={victims}
      color="bg-red-600"
    />

    <StatsCard
      title="🚨 Mission Status"
      value="ACTIVE"
      color="bg-green-600"
    />

  </div>
)}
      {confidence.length > 0 && (
  <div className="mt-4 bg-slate-800 p-4 rounded-lg">
    <h3 className="text-xl font-bold mb-2 text-yellow-400">
      Confidence Scores
    </h3>

    {confidence.map((score, index) => (
      <p key={index} className="text-lg">
        👤 Victim {index + 1}: {score}%
      </p>
    ))}
  </div>
)}

      {detectedImage && (
        <div className="mt-6">
          <h3 className="text-xl mb-2">Detected Image</h3>

          <img
            src={detectedImage}
            alt="Detected"
            className="w-96 rounded-lg shadow-lg"
          />
        </div>
      )}

    </div>

  );

}


export default UploadSection;