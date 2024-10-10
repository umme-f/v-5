import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Localization hook

const VehicleDetails = () => {
  const { t } = useTranslation();

  // State for form data
  const [formData, setFormData] = useState({
    vehicle_no: "",
    vehicle_license: "",
    supplier_no: ""
  });

  // State for response messages
  const [responseMessage, setResponseMessage] = useState(null);
  const [vehicleData, setVehicleData] = useState([]); // For displaying vehicle data

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

    // Ensure that vehicle_no and supplier_no are valid and non-zero
    const vehicleData = {
      vehicle_no: parseInt(formData.vehicle_no, 10),
      vehicle_license: formData.vehicle_license,
      supplier_no: parseInt(formData.supplier_no, 10),
    };

    // Validate vehicle_no and supplier_no before sending
    if (vehicleData.vehicle_no === 0 || vehicleData.supplier_no === 0) {
      setResponseMessage("Vehicle No and Supplier No cannot be 0.");
      return;
    }

    // Log the data to verify before submitting
    console.log("Data being sent:", vehicleData);

    // POST request to FastAPI backend
    fetch("http://localhost:8000/api/load_vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(`HTTP error! Status: ${response.status} - ${data.detail}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage(`Vehicle loaded successfully: ${JSON.stringify(data)}`);
        fetchVehicleData(); // Fetch the updated vehicle data after submission
      })
      .catch((error) => {
        console.error("Error in submission:", error);
        setResponseMessage(`Error: ${error.message}`);
      });
  };

  // Fetch vehicle data from FastAPI
  const fetchVehicleData = () => {
    fetch("http://localhost:8000/api/vehicle_data/")
      .then((response) => response.json())
      .then((data) => {
        setVehicleData(data.data); // Assuming data.data contains the vehicle data array
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  };

  // Fetch the vehicle data when the component mounts
  useEffect(() => {
    fetchVehicleData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{t("Load Vehicle Form")}</h2>

      {/* Form */}
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
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      {/* Display vehicle data */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">{t("Vehicle Data")}</h3>
        {vehicleData.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">{t("Vehicle No")}</th>
                <th className="px-4 py-2">{t("License")}</th>
                <th className="px-4 py-2">{t("Supplier No")}</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border px-4 py-2">{vehicle.vehicle_no}</td>
                  <td className="border px-4 py-2">{vehicle.vehicle_license}</td>
                  <td className="border px-4 py-2">{vehicle.supplier_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t("No vehicles loaded yet.")}</p>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
