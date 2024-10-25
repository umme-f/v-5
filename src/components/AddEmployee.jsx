import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from 'react-router-dom'; // To navigate between pages

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        employee_no: '',
        employee_name: '',
        department: '',
        license: ''
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
            const response = await axios.post("http://localhost:8000/api/load_employees", employeeData);

            if (response.status === 200) {
                // Show success toast message and navigate back after it's displayed
                toast.success("Employee saved successfully!", {
                    position: "top-right",
                    autoClose: 1000, // Auto close after 1 seconds
                    onClose: () => navigate(-1), // Navigate back to the previous page after toast closes
                });
            } else {
                // Show error toast message
                toast.error("Failed to save employee.");
            }
        } catch (error) {
            console.error("Error saving employee:", error);
            // Show error toast message
            toast.error("An error occurred while saving the employee.");
        }
    };

    // When clear button is pressed
    const handleClearData = (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        setSupplierData({
            employee_no: '',
            employee_name: '',
            department: '',
            license: ''
        });
    };

    return (
        <div className="container mx-auto p-6">
            {/* ToastContainer for displaying toast messages */}
            <ToastContainer />

            <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
            <form className="space-y-4">
                {/* Employee Number */}
                <div>
                    <label htmlFor="employee_no" className="block text-sm font-medium">
                        Employee Number
                    </label>
                    <input
                        type="number"
                        id="employee_no"
                        name="employee_no"
                        value={employeeData.employee_no}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Employee Name */}
                <div>
                    <label htmlFor="employee_name" className="block text-sm font-medium">
                        Employee Name
                    </label>
                    <input
                        type="text"
                        id="employee_name"
                        name="employee_name"
                        value={employeeData.employee_name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Department Name */}
                <div>
                    <label htmlFor="department" className="block text-sm font-medium">
                        Receptionist Name
                    </label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={employeeData.department}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* License Number */}
                <div>
                    <label htmlFor="license" className="block text-sm font-medium">
                        License
                    </label>
                    <input
                        type="text"
                        id="license"
                        name="license"
                        value={employeeData.license}
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
                        <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" /> Save Employee
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

export default AddEmployee;
