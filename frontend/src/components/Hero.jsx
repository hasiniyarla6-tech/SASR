function Hero() {
  return (
    <section className="bg-slate-950 text-white min-h-[80vh] flex items-center justify-center px-10">

      <div className="text-center max-w-4xl">

        <h1 className="text-6xl font-extrabold leading-tight">
          Smart Autonomous
          <br />
          Search & Rescue System
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          An AI-powered platform that detects fire, smoke and victims
          from disaster images to assist rescue teams with faster and
          smarter emergency response.
        </p>

        <div className="mt-10 flex justify-center gap-6">

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold">
            🚀 Start Mission
          </button>

          <button className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl text-lg font-semibold">
            📷 Upload Image
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;