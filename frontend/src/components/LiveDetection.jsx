import { useEffect, useRef, useState } from "react";

function LiveDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [victims, setVictims] = useState(0);
  const [confidence, setConfidence] = useState([]);
  const [risk, setRisk] = useState("LOW");
  const [loading, setLoading] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);

  // -----------------------------
  // START CAMERA
  // -----------------------------

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
      setVictims(0);
      setConfidence([]);
      setRisk("LOW");
      setDetectionCount(0);

      // Analyze one frame every second
      intervalRef.current = setInterval(() => {
        captureFrame();
      }, 1000);
    } catch (error) {
      console.error("Camera error:", error);

      alert(
        "Unable to access camera. Please allow camera permission and try again."
      );
    }
  };

  // -----------------------------
  // STOP CAMERA
  // -----------------------------

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setVictims(0);
    setConfidence([]);
    setRisk("LOW");
    setLoading(false);
    setDetectionCount(0);
  };

  // -----------------------------
  // CAPTURE FRAME
  // -----------------------------

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    if (videoRef.current.readyState < 2) return;

    setLoading(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          setLoading(false);
          return;
        }

        const formData = new FormData();

        formData.append(
          "file",
          blob,
          "live_frame.jpg"
        );

        try {
          const response = await fetch(
            "http://127.0.0.1:8000/live-detect",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Detection request failed");
          }

          const data = await response.json();

          setVictims(data.people_detected || 0);

          setConfidence(
            data.confidence_scores || []
          );

          setRisk(
            data.risk_level || "LOW"
          );

          setDetectionCount(
            (prev) => prev + 1
          );
        } catch (error) {
          console.error(
            "Live detection error:",
            error
          );
        }

        setLoading(false);
      },
      "image/jpeg",
      0.8
    );
  };

  // -----------------------------
  // CLEANUP
  // -----------------------------

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  // -----------------------------
  // AVERAGE CONFIDENCE
  // -----------------------------

  const averageConfidence =
    confidence.length > 0
      ? (
          confidence.reduce(
            (a, b) => a + b,
            0
          ) / confidence.length
        ).toFixed(1)
      : "0.0";

  // -----------------------------
  // RISK STYLING
  // -----------------------------

  const getRiskStyles = () => {
    if (risk === "HIGH") {
      return {
        text: "text-[#8f3f32]",
        bg: "bg-[#8f3f32]/10",
        border: "border-[#8f3f32]/20",
        dot: "bg-[#8f3f32]",
      };
    }

    if (risk === "MEDIUM") {
      return {
        text: "text-[#a66a32]",
        bg: "bg-[#a66a32]/10",
        border: "border-[#a66a32]/20",
        dot: "bg-[#a66a32]",
      };
    }

    return {
      text: "text-[#52745b]",
      bg: "bg-[#52745b]/10",
      border: "border-[#52745b]/20",
      dot: "bg-[#52745b]",
    };
  };

  const riskStyles = getRiskStyles();

  return (
    <section
      id="live-detection"
      className="relative overflow-hidden py-24 px-6 md:px-10"
      style={{
        background:
          "radial-gradient(circle at 10% 20%, rgba(139,94,60,0.12), transparent 30%), radial-gradient(circle at 90% 80%, rgba(166,124,82,0.12), transparent 30%), linear-gradient(135deg, #faf7f2 0%, #f3eee7 50%, #eee7de 100%)",
      }}
    >

      {/* -------------------------------- */}
      {/* DECORATIVE BACKGROUND */}
      {/* -------------------------------- */}

      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#8b5e3c]/10 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a67c52]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm">

            <span
              className={`w-2.5 h-2.5 rounded-full ${
                cameraActive
                  ? "bg-[#9d3f32] animate-pulse"
                  : "bg-[#8b5e3c]"
              }`}
            />

            <span className="text-sm font-bold tracking-widest text-[#6f4e37]">
              {cameraActive
                ? "LIVE AI MONITORING"
                : "AI RESCUE MONITORING"}
            </span>

          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold text-[#3f2d20]">
            Live Rescue Detection
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-[#765f4d]">
            Real-time computer vision analysis for detecting
            victims during disaster response operations.
          </p>

        </div>

        {/* -------------------------------- */}
        {/* MAIN GLASS CONTAINER */}
        {/* -------------------------------- */}

        <div className="rounded-[2rem] bg-white/45 backdrop-blur-2xl border border-white/80 shadow-[0_30px_80px_rgba(70,45,25,0.15)] p-5 md:p-8">

          {/* -------------------------------- */}
          {/* CAMERA VIEW */}
          {/* -------------------------------- */}

          <div className="relative overflow-hidden rounded-3xl bg-[#241b16] aspect-video border border-[#8b5e3c]/20 shadow-inner">

            {cameraActive ? (
              <>

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* LIVE BADGE */}

                <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-black/55 backdrop-blur-md text-white">

                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />

                  <span className="font-bold text-sm">
                    LIVE
                  </span>

                </div>

                {/* AI BADGE */}

                <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-[#6f4e37]/85 backdrop-blur-md text-white text-sm font-semibold">

                  🤖 AI VISION ACTIVE

                </div>

                {/* SCANNING LINE */}

                <div className="absolute left-0 right-0 top-1/2 h-px bg-[#d4ae83]/60 shadow-[0_0_20px_rgba(212,174,131,0.9)]" />

                {/* CORNER DECORATIONS */}

                <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-xs tracking-widest">
                  SEARCH AREA
                </div>

              </>
            ) : (

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

                <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-5xl mb-6">
                  📷
                </div>

                <h3 className="text-2xl font-bold">
                  Camera Offline
                </h3>

                <p className="mt-2 text-white/60">
                  Start the camera to begin AI detection
                </p>

              </div>

            )}

          </div>

          {/* Hidden Canvas */}

          <canvas
            ref={canvasRef}
            className="hidden"
          />

          {/* -------------------------------- */}
          {/* CONTROL BUTTON */}
          {/* -------------------------------- */}

          <div className="flex flex-col sm:flex-row gap-4 mt-7">

            {!cameraActive ? (

              <button
                onClick={startCamera}
                className="
                  flex-1
                  py-4
                  px-6
                  rounded-2xl
                  bg-[#6f4e37]
                  hover:bg-[#5a4030]
                  text-white
                  font-bold
                  text-lg
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                🎥 Start Live Detection
              </button>

            ) : (

              <button
                onClick={stopCamera}
                className="
                  flex-1
                  py-4
                  px-6
                  rounded-2xl
                  bg-[#3f2d20]
                  hover:bg-[#2e2118]
                  text-white
                  font-bold
                  text-lg
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                ⏹ Stop Detection
              </button>

            )}

          </div>

          {/* -------------------------------- */}
          {/* LIVE STATISTICS */}
          {/* -------------------------------- */}

          {cameraActive && (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

              {/* VICTIMS */}

              <div className="group relative overflow-hidden rounded-3xl bg-white/55 backdrop-blur-xl border border-white/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#8b5e3c]/10 blur-2xl" />

                <div className="relative flex justify-between items-start">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-[#806653]">
                      Victims
                    </p>

                    <p className="mt-3 text-5xl font-extrabold text-[#3f2d20]">
                      {victims}
                    </p>

                    <p className="mt-4 text-sm text-[#806653]">
                      Individuals detected by AI
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-[#8b5e3c]/10 flex items-center justify-center text-2xl">
                    👥
                  </div>

                </div>

              </div>

              {/* CONFIDENCE */}

              <div className="group relative overflow-hidden rounded-3xl bg-white/55 backdrop-blur-xl border border-white/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#b08968]/15 blur-2xl" />

                <div className="relative flex justify-between items-start">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-[#806653]">
                      Confidence
                    </p>

                    <p className="mt-3 text-5xl font-extrabold text-[#3f2d20]">
                      {averageConfidence}%
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-[#b08968]/15 flex items-center justify-center text-2xl">
                    🎯
                  </div>

                </div>

                <div className="mt-5 h-2 rounded-full bg-[#8b5e3c]/10 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6f4e37] to-[#b08968] transition-all duration-500"
                    style={{
                      width: `${averageConfidence}%`,
                    }}
                  />

                </div>

              </div>

              {/* RISK */}

              <div
                className={`group relative overflow-hidden rounded-3xl ${riskStyles.bg} backdrop-blur-xl border ${riskStyles.border} p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-[#806653]">
                      Risk Level
                    </p>

                    <p
                      className={`mt-3 text-5xl font-extrabold ${riskStyles.text}`}
                    >
                      {risk}
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center text-2xl">
                    🚨
                  </div>

                </div>

                <div className="flex items-center gap-2 mt-5">

                  <span
                    className={`w-2.5 h-2.5 rounded-full ${riskStyles.dot} ${
                      cameraActive
                        ? "animate-pulse"
                        : ""
                    }`}
                  />

                  <span className="text-sm font-semibold text-[#806653]">
                    AI risk assessment
                  </span>

                </div>

              </div>

            </div>

          )}

          {/* -------------------------------- */}
          {/* DETECTION INFORMATION */}
          {/* -------------------------------- */}

          {cameraActive && (

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              {/* AI ENGINE */}

              <div className="rounded-3xl bg-white/45 backdrop-blur-xl border border-white/80 p-6 shadow-sm">

                <p className="text-sm uppercase tracking-wider font-semibold text-[#806653]">
                  Detection Engine
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <span className="w-3 h-3 bg-[#52745b] rounded-full animate-pulse" />

                  <span className="text-lg font-bold text-[#3f2d20]">
                    YOLO AI Vision
                  </span>

                </div>

                <p className="text-sm text-[#806653] mt-2">
                  Real-time object detection active
                </p>

              </div>

              {/* FRAMES */}

              <div className="rounded-3xl bg-white/45 backdrop-blur-xl border border-white/80 p-6 shadow-sm">

                <p className="text-sm uppercase tracking-wider font-semibold text-[#806653]">
                  Frames Analysed
                </p>

                <div className="flex items-end justify-between">

                  <p className="text-3xl font-extrabold text-[#3f2d20] mt-2">
                    {detectionCount}
                  </p>

                  <span className="text-sm text-[#806653]">
                    AI scans
                  </span>

                </div>

              </div>

            </div>

          )}

          {/* -------------------------------- */}
          {/* AI STATUS */}
          {/* -------------------------------- */}

          {loading && cameraActive && (

            <div className="flex items-center gap-4 mt-6 px-5 py-4 rounded-2xl bg-[#8b5e3c]/10 border border-[#8b5e3c]/20">

              <div className="w-5 h-5 rounded-full border-3 border-[#8b5e3c]/20 border-t-[#6f4e37] animate-spin" />

              <div>

                <p className="font-bold text-[#6f4e37]">
                  AI analyzing live frame...
                </p>

                <p className="text-sm text-[#806653]">
                  Searching for potential victims and assessing scene risk.
                </p>

              </div>

            </div>

          )}

          {/* -------------------------------- */}
          {/* READY STATUS */}
          {/* -------------------------------- */}

          {!cameraActive && (

            <div className="mt-6 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#8b5e3c]/10 border border-[#8b5e3c]/15">

              <span className="w-3 h-3 rounded-full bg-[#8b5e3c]" />

              <div>

                <p className="font-bold text-[#6f4e37]">
                  Rescue Vision Ready
                </p>

                <p className="text-sm text-[#806653]">
                  Start live detection when you are ready to scan the disaster area.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default LiveDetection;