import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Localization hook

const VehicleDetails = () => {
    const { t } = useTranslation();
  const [formData, setFormData] = useState({
    vehicle_no: "",
    vehicle_license: "",
    supplier_no: ""
  });

  const [responseMessage, setResponseMessage] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request to FastAPI backend
    fetch("http://localhost:8000/api/load_vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(`Vehicle loaded successfully: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        setResponseMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{t("Load Vehicle Form")}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_no">
            {t("Vehicle No")}
          </label>
          <input
            type="number"
            name="vehicle_no"
            id="vehicle_no"
            value={formData.vehicle_no}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_license">
            {t("Vehicle License")}
          </label>
          <input
            type="text"
            name="vehicle_license"
            id="vehicle_license"
            value={formData.vehicle_license}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplier_no">
            {t("Supplier No")}
          </label>
          <input
            type="number"
            name="supplier_no"
            id="supplier_no"
            value={formData.supplier_no}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          {t("Submit")}
        </button>
      </form>

      {/* Response message */}
      {responseMessage && (
        <div className="mt-4 p-4 bg-green-200 text-green-800">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
