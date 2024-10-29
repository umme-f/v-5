import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toast

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import EditOrChangeModal from "./EditOrChangeModal";

const EditSupplier = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { supplier } = location.state || {};

  // Initialize state
  const [vehicleSupplierData, setVehicleSupplierData] = useState({
    supplier_no: supplier?.supplier_no || "",
    supplier_name: supplier?.supplier_name || "",
    receptionist_name: supplier?.receptionist_name || "",
    telephone_number: supplier?.telephone_number || "",
  });

  // The confirmation modal after changing or editing data
  const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);

  // Fetch supplier data if not available in location state
  useEffect(() => {
    if (!supplier) {
      const fetchSupplierData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/suppliers/${supplier.supplier_no}`
          );
          if (response.ok) {
            const data = await response.json();
            setVehicleSupplierData(data);
          }
        } catch (error) {
          console.error("Error fetching supplier data:", error);
        }
      };
      fetchSupplierData();
    }
  }, [supplier]);

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleSupplierData({
      ...vehicleSupplierData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    setIsChangeDialogOpen(true); // open the modal when the user tries to save
  };

  const confirmChange = () => {
    setIsChangeDialogOpen(false); // close the modal
    handleConfirmSave(); // proceed with saving data
  };

  const cancelChange = () => {
    setIsChangeDialogOpen(false); // close the modal without saving
  };

  const handleConfirmSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/suppliers/${vehicleSupplierData.supplier_no}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleSupplierData),
        }
      );

      if (response.ok) {
        toast.success("Supplier saved successfully!", {
                    position: "top-right",
                    autoClose: 3000, // Auto close after 3seconds
                    onClose: () => navigate("/supplier-details"), // Navigate back to the previous page after toast closes
                });
      } else {
        const errorData = await response.json();
        
        toast.error(`Failed to update supplier data: ${errorData.detail}`);
        // alert(`Failed to update supplier data: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/supplier-details");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Supplier</h2>
      <ToastContainer/>
      {vehicleSupplierData ? (
        <>
          <form className="space-y-4">
            <div className="text-sm font-medium">
              Supplier No
              <input
                type="number"
                name="supplier_no"
                value={vehicleSupplierData.supplier_no}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
                readOnly
              />
            </div>

            <div className="text-sm font-medium">
              Supplier Name
              <input
                type="text"
                name="supplier_name"
                value={vehicleSupplierData.supplier_name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="text-sm font-medium">
              Receptionist Name
              <input
                type="text"
                name="receptionist_name"
                value={vehicleSupplierData.receptionist_name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="text-sm font-medium">
              Telephone Number
              <input
                type="text"
                name="telephone_number"
                value={vehicleSupplierData.telephone_number}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
                Save Supplier
              </button>

              <button
                type="button"
                onClick={handleBackClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
                Back
              </button>
            </div>
          </form>
          <EditOrChangeModal
            isOpen={isChangeDialogOpen}
            confirmChange={confirmChange}
            cancelChange={cancelChange}
          />
        </>
      ) : (
        <p>Loading supplier data...</p>
      )}
    </div>
  );
};

export default EditSupplier;
