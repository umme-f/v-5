import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from 'react-router-dom'; // To navigate between pages

const AddSupplier = () => {
    const [supplierData, setSupplierData] = useState({
        supplier_no: '',
        supplier_name: '',
        receptionist_name: '',
        telephone_number: ''
    });

    const navigate = useNavigate(); // Hook for navigation

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplierData({
            ...supplierData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSaveClick = async (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        try {
            const response = await axios.post("http://localhost:8000/api/load_supplier", supplierData);

            if (response.status === 200) {
                // Show success toast message and navigate back after it's displayed
                toast.success("Supplier saved successfully!", {
                    position: "top-right",
                    autoClose: 1000, // Auto close after 1 seconds
                    onClose: () => navigate(-1), // Navigate back to the previous page after toast closes
                });
            } else {
                // Show error toast message
                toast.error("Failed to save supplier.");
            }
        } catch (error) {
            console.error("Error saving supplier:", error);
            // Show error toast message
            toast.error("An error occurred while saving the supplier.");
        }
    };

    // When clear button is pressed
    const handleClearData = (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        setSupplierData({
            supplier_no: '',
            supplier_name: '',
            receptionist_name: '',
            telephone_number: ''
        });
    };

    return (
        <div className="container mx-auto p-6">
            {/* ToastContainer for displaying toast messages */}
            <ToastContainer />

            <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
            <form className="space-y-4">
                {/* Supplier Number */}
                <div>
                    <label htmlFor="supplier_no" className="block text-sm font-medium">
                        Supplier Number
                    </label>
                    <input
                        type="number"
                        id="supplier_no"
                        name="supplier_no"
                        value={supplierData.supplier_no}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Supplier Name */}
                <div>
                    <label htmlFor="supplier_name" className="block text-sm font-medium">
                        Supplier Name
                    </label>
                    <input
                        type="text"
                        id="supplier_name"
                        name="supplier_name"
                        value={supplierData.supplier_name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Receptionist Name */}
                <div>
                    <label htmlFor="receptionist_name" className="block text-sm font-medium">
                        Receptionist Name
                    </label>
                    <input
                        type="text"
                        id="receptionist_name"
                        name="receptionist_name"
                        value={supplierData.receptionist_name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Telephone Number */}
                <div>
                    <label htmlFor="telephone_number" className="block text-sm font-medium">
                        Telephone Number
                    </label>
                    <input
                        type="text"
                        id="telephone_number"
                        name="telephone_number"
                        value={supplierData.telephone_number}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Submit and Clear Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" /> Save Supplier
                    </button>
                    <button
                        onClick={handleClearData}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;
