import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  ScanSearch,
  Users,
  AlertTriangle,
  Radio,
  Target,
  Clock3,
  Siren,
  CheckCircle2,
  Loader2,
} from "lucide-react";

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

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));

    setVictims(null);
    setConfidence([]);
    setDetectedImage(null);
    setRisk("");
    setMission("");
    setRecommendation("");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setVictims(data.people_detected);
      setConfidence(data.confidence_scores || []);
      setRisk(data.risk_level);
      setMission(data.mission_status);
      setRecommendation(data.recommendation);

      setDetectedImage(
        `http://127.0.0.1:8000/${data.output_image}?t=${Date.now()}`
      );

      setTime(new Date().toLocaleString());

    } catch (error) {
      console.error(error);
      alert("Upload Failed. Make sure FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  const averageConfidence =
    confidence.length > 0
      ? (
          confidence.reduce((a, b) => a + b, 0) /
          confidence.length
        ).toFixed(2)
      : 0;

  const riskIsHigh = risk === "HIGH";
  const riskIsMedium = risk === "MEDIUM";

  return (
    <section
      id="upload"
      className="relative overflow-hidden py-24 px-6 md:px-10"
      style={{
        background: `
          radial-gradient(
            circle at 10% 20%,
            rgba(139, 94, 60, 0.12),
            transparent 28%
          ),
          radial-gradient(
            circle at 90% 75%,
            rgba(176, 137, 104, 0.13),
            transparent 30%
          ),
          linear-gradient(
            135deg,
            #faf8f5 0%,
            #f4efe9 50%,
            #eee6dd 100%
          )
        `,
      }}
    >

      {/* BACKGROUND DECORATION */}

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8b5e3c]/10 blur-[110px]" />

      <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-[#b08968]/10 blur-[120px]" />

      <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#6f4e37]/5 blur-[100px]" />


      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="text-center mb-14">

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

            <ScanSearch
              size={16}
              className="text-[#8b5e3c]"
            />

            <span className="text-xs md:text-sm font-bold tracking-[0.18em] text-[#6f4e37]">
              MISSION INTELLIGENCE
            </span>

          </div>


          <h2 className="mt-7 text-4xl md:text-6xl font-extrabold tracking-tight text-[#3d2b1f]">

            AI Disaster
            <span className="text-[#8b5e3c]"> Analysis</span>

          </h2>


          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-[#806b59]">

            Upload a disaster scene and let SASR AI detect victims,
            evaluate risk and generate intelligent rescue recommendations.

          </p>

        </div>


        {/* ================= MAIN GLASS PANEL ================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-white/40
            backdrop-blur-2xl
            border
            border-white/80
            shadow-[0_20px_60px_rgba(70,45,25,0.12)]
            p-6
            md:p-10
          "
        >

          {/* Panel glow */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#8b5e3c]/10 blur-[90px]" />


          <div className="relative">

            {/* PANEL HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-9">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                  Image Intelligence
                </p>

                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-[#3d2b1f]">
                  Upload Disaster Scene
                </h3>

                <p className="mt-2 text-sm md:text-base text-[#806b59]">
                  Supported formats: JPG, JPEG and PNG
                </p>

              </div>


              {/* READY STATUS */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-full
                  bg-[#8b5e3c]/10
                  border
                  border-[#8b5e3c]/15
                  text-[#6f4e37]
                  text-sm
                  font-semibold
                "
              >

                <span className="relative flex h-2.5 w-2.5">

                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />

                </span>

                AI Detection Ready

              </div>

            </div>


            {/* ================= UPLOAD AREA ================= */}

            <label
              className="
                group
                relative
                flex
                flex-col
                items-center
                justify-center
                min-h-[230px]
                rounded-[28px]
                cursor-pointer
                bg-white/35
                backdrop-blur-xl
                border-2
                border-dashed
                border-[#8b5e3c]/25
                hover:border-[#8b5e3c]/50
                hover:bg-white/50
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-20
                  h-20
                  flex
                  items-center
                  justify-center
                  rounded-3xl
                  bg-[#8b5e3c]/10
                  border
                  border-[#8b5e3c]/15
                  text-[#6f4e37]
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >

                <Upload size={34} strokeWidth={1.7} />

              </div>


              <h4 className="mt-5 text-xl font-bold text-[#3d2b1f]">
                Choose a Disaster Image
              </h4>


              <p className="mt-2 text-sm text-[#806b59]">
                Click here to upload an image for AI analysis
              </p>


              <div className="mt-5 px-5 py-2.5 rounded-xl bg-[#6f4e37] text-white text-sm font-semibold shadow-md group-hover:bg-[#5b4030] transition">
                Select Image
              </div>


              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />

            </label>


            {/* ================= LOADING ================= */}

            {loading && (

              <div
                className="
                  mt-8
                  rounded-3xl
                  bg-white/45
                  backdrop-blur-xl
                  border
                  border-white/80
                  p-8
                  text-center
                  shadow-[0_15px_40px_rgba(70,45,25,0.08)]
                "
              >

                <div className="flex justify-center">

                  <div
                    className="
                      w-16
                      h-16
                      flex
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#8b5e3c]/10
                    "
                  >

                    <Loader2
                      size={32}
                      className="text-[#8b5e3c] animate-spin"
                    />

                  </div>

                </div>


                <h3 className="mt-5 text-xl font-bold text-[#3d2b1f]">
                  AI is analysing the disaster scene
                </h3>


                <p className="mt-2 text-[#806b59]">
                  Detecting victims and evaluating mission risk...
                </p>


                <div className="mt-6 max-w-sm mx-auto h-1.5 rounded-full bg-[#8b5e3c]/10 overflow-hidden">

                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#6f4e37] to-[#b08968] animate-pulse" />

                </div>

              </div>

            )}


            {/* ================= IMAGES ================= */}

            {(image || detectedImage) && !loading && (

              <div className="grid md:grid-cols-2 gap-6 mt-10">

                {/* ORIGINAL */}

                {image && (

                  <div
                    className="
                      group
                      rounded-[26px]
                      bg-white/45
                      backdrop-blur-xl
                      border
                      border-white/80
                      p-4
                      shadow-[0_15px_40px_rgba(70,45,25,0.08)]
                    "
                  >

                    <div className="flex items-center gap-3 mb-4 px-1">

                      <div className="w-10 h-10 rounded-xl bg-[#8b5e3c]/10 flex items-center justify-center">

                        <ImageIcon
                          size={20}
                          className="text-[#6f4e37]"
                        />

                      </div>

                      <div>

                        <h3 className="font-bold text-[#4e3627]">
                          Original Image
                        </h3>

                        <p className="text-xs text-[#806b59]">
                          Uploaded disaster scene
                        </p>

                      </div>

                    </div>


                    <img
                      src={image}
                      alt="Original disaster"
                      className="w-full rounded-2xl object-cover max-h-[420px]"
                    />

                  </div>

                )}


                {/* DETECTION */}

                {detectedImage && (

                  <div
                    className="
                      group
                      rounded-[26px]
                      bg-white/45
                      backdrop-blur-xl
                      border
                      border-white/80
                      p-4
                      shadow-[0_15px_40px_rgba(70,45,25,0.08)]
                    "
                  >

                    <div className="flex items-center gap-3 mb-4 px-1">

                      <div className="w-10 h-10 rounded-xl bg-[#8b5e3c]/10 flex items-center justify-center">

                        <ScanSearch
                          size={20}
                          className="text-[#6f4e37]"
                        />

                      </div>

                      <div>

                        <h3 className="font-bold text-[#4e3627]">
                          AI Detection
                        </h3>

                        <p className="text-xs text-[#806b59]">
                          Detected victims highlighted
                        </p>

                      </div>

                    </div>


                    <img
                      src={detectedImage}
                      alt="AI detection"
                      className="w-full rounded-2xl object-cover max-h-[420px]"
                    />

                  </div>

                )}

              </div>

            )}


            {/* ================= RESULTS ================= */}

            {victims !== null && (

              <div className="mt-10">

                <div className="mb-5">

                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-[#8b5e3c]">
                    Detection Results
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-[#3d2b1f]">
                    Mission Intelligence Summary
                  </h3>

                </div>


                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

                  {/* VICTIMS */}

                  <div className="rounded-3xl p-6 bg-white/50 backdrop-blur-xl border border-white/80 shadow-sm">

                    <div className="w-12 h-12 rounded-2xl bg-[#8b5e3c]/10 flex items-center justify-center">

                      <Users
                        size={23}
                        className="text-[#6f4e37]"
                      />

                    </div>

                    <p className="mt-5 text-xs uppercase tracking-wider font-bold text-[#806653]">
                      Victims
                    </p>

                    <p className="mt-1 text-4xl font-extrabold text-[#3d2b1f]">
                      {victims}
                    </p>

                    <p className="mt-2 text-xs text-[#806b59]">
                      People detected
                    </p>

                  </div>


                  {/* RISK */}

                  <div className="rounded-3xl p-6 bg-white/50 backdrop-blur-xl border border-white/80 shadow-sm">

                    <div
                      className={`
                        w-12
                        h-12
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        ${
                          riskIsHigh
                            ? "bg-red-500/10 text-red-700"
                            : riskIsMedium
                            ? "bg-amber-500/10 text-amber-700"
                            : "bg-green-500/10 text-green-700"
                        }
                      `}
                    >

                      <AlertTriangle size={23} />

                    </div>

                    <p className="mt-5 text-xs uppercase tracking-wider font-bold text-[#806653]">
                      Risk Level
                    </p>

                    <p
                      className={`
                        mt-1
                        text-3xl
                        font-extrabold
                        ${
                          riskIsHigh
                            ? "text-red-700"
                            : riskIsMedium
                            ? "text-amber-700"
                            : "text-green-700"
                        }
                      `}
                    >
                      {risk || "LOW"}
                    </p>

                    <p className="mt-2 text-xs text-[#806b59]">
                      AI severity assessment
                    </p>

                  </div>


                  {/* MISSION */}

                  <div className="rounded-3xl p-6 bg-white/50 backdrop-blur-xl border border-white/80 shadow-sm">

                    <div className="w-12 h-12 rounded-2xl bg-[#8b5e3c]/10 flex items-center justify-center">

                      <Radio
                        size={23}
                        className="text-[#6f4e37]"
                      />

                    </div>

                    <p className="mt-5 text-xs uppercase tracking-wider font-bold text-[#806653]">
                      Mission
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-[#3d2b1f]">
                      {mission || "Pending"}
                    </p>

                    <p className="mt-2 text-xs text-[#806b59]">
                      Current mission status
                    </p>

                  </div>


                  {/* CONFIDENCE */}

                  <div className="rounded-3xl p-6 bg-white/50 backdrop-blur-xl border border-white/80 shadow-sm">

                    <div className="w-12 h-12 rounded-2xl bg-[#8b5e3c]/10 flex items-center justify-center">

                      <Target
                        size={23}
                        className="text-[#6f4e37]"
                      />

                    </div>

                    <p className="mt-5 text-xs uppercase tracking-wider font-bold text-[#806653]">
                      Avg Confidence
                    </p>

                    <p className="mt-1 text-4xl font-extrabold text-[#3d2b1f]">
                      {averageConfidence}%
                    </p>

                    <p className="mt-2 text-xs text-[#806b59]">
                      Detection confidence
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* ================= CONFIDENCE ================= */}

            {confidence.length > 0 && (

              <div
                className="
                  rounded-3xl
                  mt-8
                  p-7
                  bg-white/45
                  backdrop-blur-xl
                  border
                  border-white/80
                  shadow-sm
                "
              >

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

                  <div>

                    <p className="text-xs uppercase tracking-[0.18em] font-bold text-[#8b5e3c]">
                      AI Accuracy
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#3d2b1f]">
                      Detection Confidence
                    </h3>

                  </div>

                  <span className="px-4 py-2 rounded-full bg-[#8b5e3c]/10 text-[#6f4e37] text-sm font-semibold">
                    {confidence.length} detection(s)
                  </span>

                </div>


                {confidence.map((score, index) => (

                  <div key={index} className="mb-6 last:mb-0">

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold text-[#4e3627]">
                        Victim {index + 1}
                      </span>

                      <span className="font-bold text-[#6b4b36]">
                        {score}%
                      </span>

                    </div>


                    <div className="bg-[#e7ddd1]/80 rounded-full h-3 overflow-hidden">

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
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            )}


            {/* ================= AI RECOMMENDATION ================= */}

            {recommendation && (

              <div
                className="
                  relative
                  overflow-hidden
                  mt-8
                  rounded-3xl
                  p-7
                  bg-gradient-to-br
                  from-[#5b4030]
                  via-[#6f4e37]
                  to-[#8b5e3c]
                  text-white
                  shadow-[0_20px_45px_rgba(70,45,25,0.20)]
                "
              >

                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

                <div className="relative flex items-start gap-5">

                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">

                    <Siren size={27} />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-[#e7d4c1] font-bold">
                      AI Decision Support
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">
                      Rescue Recommendation
                    </h3>

                    <p className="mt-3 text-[#f3e9df] leading-relaxed">
                      {recommendation}
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* ================= TIMESTAMP ================= */}

            {time && (

              <div
                className="
                  mt-8
                  rounded-3xl
                  p-5
                  bg-white/40
                  backdrop-blur-xl
                  border
                  border-white/80
                  flex
                  items-center
                  gap-4
                "
              >

                <div className="w-12 h-12 rounded-2xl bg-[#8b5e3c]/10 flex items-center justify-center">

                  <Clock3
                    size={22}
                    className="text-[#6f4e37]"
                  />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wider font-semibold text-[#806b59]">
                    Analysis Timestamp
                  </p>

                  <p className="mt-1 font-bold text-[#4e3627]">
                    {time}
                  </p>

                </div>

                <CheckCircle2
                  size={21}
                  className="ml-auto text-green-600"
                />

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default UploadSection;