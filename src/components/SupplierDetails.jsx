import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // To handle navigation

import {
  faAdd,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const SupplierDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const navigate = useNavigate(); // To navigate between pages


  // Fetch supplier data from FastAPI backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/suppliers/")
      .then((response) => {
        setSuppliers(response.data.suppliers);
        setFilteredSuppliers(response.data.suppliers); // Initialize filtered suppliers
      })
      .catch((error) => {
        console.error("There was an error fetching the suppliers!", error);
      });
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterSuppliers(searchValue);
  };
  const handleAddSupplierClick = () => {
    navigate("/add-supplier"); // Navigate to the AddVehicle component
  };

  // Filter suppliers based on search term
  const filterSuppliers = (searchValue) => {
    if (!searchValue.trim()) {
      setFilteredSuppliers(suppliers); // Show all suppliers if search term is empty
      return;
    }

    const filtered = suppliers.filter(
      (supplier) =>
        supplier.supplier_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        supplier.supplier_id.toString().includes(searchValue) ||
        supplier.receptionist
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        supplier.tel_no.includes(searchValue)
    );
    setFilteredSuppliers(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-5">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
          Supplier Details
        </h2>

        {/* Search box */}
        <div className="w-full md:max-w-4xl md:w-auto">
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-slate-200 rounded p-2 flex-grow mb-2 md:mb-0"
            />
            <button className="rounded p-2 bg-gray-500 text-white mb-2 md:mb-0">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
      <hr className="h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold mb-4">Supplier Data</h3>
        {/* Add/Delete Supplier Buttons */}
        <div className="flex gap-3">
            <button
              onClick={handleAddSupplierClick}
              className="rounded p-2 bg-blue-500 text-white"
            > 
              <FontAwesomeIcon icon={faAdd} className="pr-2"/>
              Add Supplier
            </button>
            <button
              className="rounded p-2 bg-red-500 text-white"
            > 
              <FontAwesomeIcon icon={faTrash} className="pr-2"/>
              Delete Supplier
            </button>
          </div>
      </div>

      {/* Supplier Details Table */}
      <div className="overflow-x-auto">
        {filteredSuppliers.length > 0 ? (
          <table className="min-w-full table-auto bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Supplier ID</th>
                <th className="px-4 py-2 border">Supplier Name</th>
                <th className="px-4 py-2 border">Receptionist</th>
                <th className="px-4 py-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.supplier_id}
                  className="text-center bg-gray-50"
                >
                  <td className="border px-4 py-2">{supplier.supplier_id}</td>
                  <td className="border px-4 py-2">{supplier.supplier_name}</td>
                  <td className="border px-4 py-2">{supplier.receptionist}</td>
                  <td className="border px-4 py-2">{supplier.tel_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No suppliers found.</p>
        )}
      </div>
    </div>
  );
};

export default SupplierDetails;
