import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleManagerDetails = () => {
    // State to hold existing vehicle manager data
    const [vehicleManagers, setVehicleManagers] = useState([]);
    const [vehicleManagerData, setVehicleManagerData] = useState({
        vehicle_no: '',
        company_id: '',
        company_name: '',
        employee_no: '',
        start_date: '',
        end_date: ''
    });

    // Fetch existing vehicle manager data on component mount
    useEffect(() => {
        fetchVehicleManagers();
    }, []);

    // Function to fetch existing vehicle managers from the backend
    const fetchVehicleManagers = async () => {
        try {
            const response = await axios.get('http://192.168.1.171:8000/api/vehicle_managers/');
            setVehicleManagers(response.data.managers);
        } catch (error) {
            console.error('Error fetching vehicle managers:', error);
            alert('Failed to fetch vehicle managers.');
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicleManagerData({
            ...vehicleManagerData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request to add vehicle manager
            await axios.post('http://192.168.1.171:8000/api/load_vehicle_manager/', vehicleManagerData);
            alert('Vehicle manager added successfully!');
            // Reset form after submission
            setVehicleManagerData({
                vehicle_no: '',
                company_id: '',
                company_name: '',
                employee_no: '',
                start_date: '',
                end_date: ''
            });
            // Fetch updated data
            fetchVehicleManagers();
        } catch (error) {
            console.error('Error adding vehicle manager:', error);
            alert('Failed to add vehicle manager.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Vehicle Manager Details</h2>

            {/* Display Table of Existing Vehicle Managers */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Existing Vehicle Managers</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">Vehicle No</th>
                                <th className="px-4 py-2 border">Company ID</th>
                                <th className="px-4 py-2 border">Company Name</th>
                                <th className="px-4 py-2 border">Employee No</th>
                                <th className="px-4 py-2 border">Start Date</th>
                                <th className="px-4 py-2 border">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleManagers.length > 0 ? (
                                vehicleManagers.map((manager, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border px-4 py-2">{manager.vehicle_no}</td>
                                        <td className="border px-4 py-2">{manager.company_id}</td>
                                        <td className="border px-4 py-2">{manager.company_name}</td>
                                        <td className="border px-4 py-2">{manager.employee_no}</td>
                                        <td className="border px-4 py-2">{manager.start_date}</td>
                                        <td className="border px-4 py-2">{manager.end_date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="border px-4 py-2">No vehicle managers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form to Add New Vehicle Manager */}
            <h3 className="text-xl font-semibold mb-4">Add New Vehicle Manager</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Vehicle Number */}
                <div>
                    <label htmlFor="vehicle_no" className="block text-sm font-medium">Vehicle Number</label>
                    <input
                        type="number"
                        id="vehicle_no"
                        name="vehicle_no"
                        value={vehicleManagerData.vehicle_no}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Company ID */}
                <div>
                    <label htmlFor="company_id" className="block text-sm font-medium">Company ID</label>
                    <input
                        type="number"
                        id="company_id"
                        name="company_id"
                        value={vehicleManagerData.company_id}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Company Name */}
                <div>
                    <label htmlFor="company_name" className="block text-sm font-medium">Company Name</label>
                    <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={vehicleManagerData.company_name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Employee Number */}
                <div>
                    <label htmlFor="employee_no" className="block text-sm font-medium">Employee Number</label>
                    <input
                        type="number"
                        id="employee_no"
                        name="employee_no"
                        value={vehicleManagerData.employee_no}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label htmlFor="start_date" className="block text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={vehicleManagerData.start_date}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label htmlFor="end_date" className="block text-sm font-medium">End Date</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={vehicleManagerData.end_date}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Save Vehicle Manager
                </button>
            </form>
        </div>
    );
};

export default VehicleManagerDetails;
