import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteRowModal from "./DeleteRowModal"; // Import the DeleteRow component

const SupplierDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null); // State to store selected supplier
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control delete modal
  const [isSelectRowWarningOpen, setIsSelectRowWarningOpen] = useState(false); // State to control no row selected modal
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
        supplier.supplier_no.toString().includes(searchValue) ||
        supplier.receptionist
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        supplier.tel_no.includes(searchValue)
    );
    setFilteredSuppliers(filtered);
  };

  // Handle row selection
  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier); // Store the selected supplier in the state
  };

  // Confirm delete action
  const confirmDelete = () => {
    // Close the delete modal
    setIsDeleteDialogOpen(false);

    // Proceed with deletion
    axios.delete(`http://localhost:8000/api/suppliers/${selectedSupplier.supplier_no}`)
      .then(() => {
        // Remove the supplier from the table locally
        const updatedSuppliers = suppliers.filter(supplier => supplier.supplier_no !== selectedSupplier.supplier_no);
        setSuppliers(updatedSuppliers);
        setFilteredSuppliers(updatedSuppliers); // Update the filtered suppliers as well
        setSelectedSupplier(null); // Clear the selection

        // Display a success message within the app (instead of an alert)
        console.log("Supplier deleted successfully.");
      })
      .catch((error) => {
        console.error('Error deleting supplier:', error);
      });
  };

  // Cancel delete action
  const cancelDelete = () => {
    setIsDeleteDialogOpen(false); // Close the delete confirmation modal
  };

  // When clicking the delete button, open the confirmation modal or show warning if no row is selected
  const handleDeleteSupplierClick = () => {
    if (selectedSupplier) {
      setIsDeleteDialogOpen(true); // Open DeleteRow modal
    } else {
      setIsSelectRowWarningOpen(true); // Show a warning modal if no row is selected
    }
  };

  // Close the warning modal for no row selected
  const closeSelectRowWarning = () => {
    setIsSelectRowWarningOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-5">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Supplier Details</h2>

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
            onClick={() => navigate("/add-supplier")}
            className="rounded p-2 bg-blue-500 text-white"
          >
            <FontAwesomeIcon icon={faAdd} className="pr-2" />
            Add Supplier
          </button>
          <button
            onClick={handleDeleteSupplierClick} // Handle delete click (open confirmation modal)
            className="rounded p-2 bg-red-500 text-white"
          >
            <FontAwesomeIcon icon={faTrash} className="pr-2" />
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
                <th className="px-4 py-2 border">Supplier No</th>
                <th className="px-4 py-2 border">Supplier Name</th>
                <th className="px-4 py-2 border">Receptionist</th>
                <th className="px-4 py-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.supplier_no}
                  className={`text-center bg-gray-50 ${selectedSupplier?.supplier_no === supplier.supplier_no ? 'bg-blue-200' : ''}`} // Highlight selected row
                  onClick={() => handleRowClick(supplier)} // Select the row when clicked
                >
                  <td className="border px-4 py-2">{supplier.supplier_no}</td>
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

      {/* Delete Confirmation Modal */}
      <DeleteRowModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />

      {/* No Row Selected Warning Modal */}
      {isSelectRowWarningOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">No Row Selected</h2>
            <p className="mb-4">Please select a row before deleting.</p>
            <div className="flex justify-end">
              <button
                onClick={closeSelectRowWarning}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierDetails;
