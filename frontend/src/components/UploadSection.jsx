import { useState } from "react";

function UploadSection() {

  const [image, setImage] = useState(null);

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
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

          <img
            src={image}
            alt="Preview"
            className="w-96 rounded-lg shadow-lg"
          />

        </div>

      )}

    </div>

  );

}

export default UploadSection;