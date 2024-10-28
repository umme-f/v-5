import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
const EditSupplier = () => {
    const navigate = useNavigate();

    const [vehicleSupplierData, setVehicleSuppllierDate] = useState({
        supplier_no :"",
        supplier_name: "",
        receptionist_name: "",
        telephone_number:""       
    });

    // Keep local copy of supplier

    const [suppliers, setSuppliers] = useState([]);

    // Input change
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setSuppliers({
            ...suppliers,
            [name]: value,
        });
    };

    const handleSaveClick = () => {
        // Show warning modal before saving
        if (window.confirm("Are you sure you want to save changes?")) {
          handleConfirmSave();
        }
      };

    // The back Click
    const handleBackClick = () =>{
        navigate("/supplier-details")
    };

    return (
        <div>
           <div>
      <div className="p-8 ">
        <h2 className="text-2xl font-bold mb-4">Edit Vehicle Manager</h2>
        <form className="space-y-4">
          {/* Suppler no */}
          <div className="block text-sm font-medium">
           Supplier No
            <input
              type="number"
              id="supplier_no"
              name="supplier_no"
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          {/* Suppler name */}
          <div className="block text-sm font-medium">
           Supplier name
            <input
              type="text"
              id="supplier_name"
              name="supplier_name"
            
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          {/* Receptionist name */}
          <div className="block text-sm font-medium">
           Receptionist Name
            <input
              type="text"
              id="receptionist_name"
              name="receptionist_name"
            
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"             
            />
          </div>
          {/* Telephone Number */}
          <div className="block text-sm font-medium">
           Telephone Number
            <input
              type="number"
              id="telephone_number"
              name="telephone_number"
            
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>




          {/* The Buttons for submit and back to previous page */}
          <div className="flex justify-between">
            {/* Submit Button */}
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
      </div>
    </div>
        </div>
    );
};

export default EditSupplier;