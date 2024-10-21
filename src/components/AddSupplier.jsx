import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
    const navigate = useNavigate();

    // State to hold input values
    const [supplierData, setSupplierData] = useState({
        supplier_no: '',
        supplier_name: '',
        receptionist: '',
        tel_no: ''
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplierData({
            ...supplierData,
            [name]: value
        });
    };

    // When clear button is pressed 
    const handleClearData = () => {
        setSupplierData({
            supplier_no: '',
            supplier_name: '',
            receptionist: '',
            tel_no: ''
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            // Make POST request to add supplier
            await axios.post('http://localhost:8000/api/load_supplier/', supplierData);
            // alert('Supplier added successfully!');

            // After successful addition, navigate back to the Supplier Details page
            navigate("/supplier-details");
        } catch (error) {
            console.error('Error adding supplier:', error);
            alert('Failed to add supplier.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="receptionist" className="block text-sm font-medium">
                        Receptionist Name
                    </label>
                    <input
                        type="text"
                        id="receptionist"
                        name="receptionist"
                        value={supplierData.receptionist}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Telephone Number */}
                <div>
                    <label htmlFor="tel_no" className="block text-sm font-medium">
                        Telephone Number
                    </label>
                    <input
                        type="text"
                        id="tel_no"
                        name="tel_no"
                        value={supplierData.tel_no}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Submit and Clear Buttons */}
                <div className='flex gap-3'>
                    <button 
                        type="submit"  // This triggers form submission to save data and navigate
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                       <FontAwesomeIcon icon={faFloppyDisk} className='pr-2'/> Save Supplier
                    </button>
                    <button
                        type="button"  // Clear button should be type="button" to avoid form submission
                        onClick={handleClearData}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                       <FontAwesomeIcon icon={faTrash} className="pr-2" /> Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;
