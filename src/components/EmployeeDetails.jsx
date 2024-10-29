import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteRowModal from "./DeleteRowModal"; // Importing the DeleteRow modal component


const EmployeeDetails = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); //
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control delete modal
  const [isSelectRowWarningOpen, setIsSelectRowWarningOpen] = useState(false); // State to control no row selected modal

  // Fetch employee data from the API
  // Fetch supplier data from FastAPI backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/employees") // Adjust to your API endpoint
      .then((response) => {
        setEmployees(response.data.employees);
        setFilteredEmployees(response.data.employees); // Initialize filtered employees
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);



  // Handle search input changes
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterEmployee(searchValue);
  };

  // Filter suppliers based on search term
  const filterEmployee = (searchValue) => {
    if (!searchValue.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter((employee) => {
      return (
        employee.employee_no.toString().includes(searchValue) ||
        employee.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.license.toString().includes(searchValue)
      );
    });

    setFilteredEmployees(filtered);
  };

  // Handle row click for selecting an employee
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  // Confirm delete action
  const confirmDelete = () => {
    // Close the delete modal
    setIsDeleteDialogOpen(false);

    // Proceed with deletion
    axios
      .delete(
        `http://localhost:8000/api/employees/${selectedEmployee.employee_no}`
      )
      .then(() => {
        // Remove the supplier from the table locally
        const updatedEmployees = employees.filter(
          (employee) => employee.employee_no !== selectedEmployee.employee_no
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees); // Update the filtered suppliers as well
        setSelectedEmployee(null); // Clear the selection

        // Display a success message within the app (instead of an alert)
        console.log("Supplier deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting supplier:", error);
      });
  };

  // Cancel delete action
  const cancelDelete = () => {
    setIsDeleteDialogOpen(false); // Close the delete confirmation modal
  };

  // When clicking the delete button, open the confirmation modal or show warning if no row is selected
  const handleDeleteEmployeeClick = () => {
    if (selectedEmployee) {
      setIsDeleteDialogOpen(true); // Open DeleteRow modal
    } else {
      setIsSelectRowWarningOpen(true); // Show a warning modal if no row is selected
    }
  };

  // Close the warning modal for no row selected
  const closeSelectRowWarning = () => {
    setIsSelectRowWarningOpen(false);
  };

  // Handle Edit Supplier button click
const handleEditEmployeeClick = () => {
  if (selectedEmployee) {

    //  The next line means the selected supplier data is stored in the router's location state. This state is accessible in the destination component (EditSupplier)
    navigate("/edit-employee", { state: { employee: selectedEmployee } });

  } else {
    alert("Please select a employee to edit.");
  }
};

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

        {/* Search */}
        <div className="w-full md:max-w-4xl md:w-auto">
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Search..."
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

      <div className="flex justify-between">
        <h3 className="text-lg font-bold mb-2">Existing Employees</h3>
        <div className="flex gap-3 pb-5">
          {/* Add Button */}
          <button
            onClick={() => navigate("/add-employee")}
            className="rounded p-2 bg-blue-500 text-white"
          >
            <FontAwesomeIcon icon={faAdd} className="pr-2" />
            Add Employee
          </button>

          {/* Edit Button */}
          <button
            onClick={handleEditEmployeeClick}
            className="rounded p-2 bg-orange-500 text-white"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="pr-2" />
            Edit Employee
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDeleteEmployeeClick}
            className="rounded p-2 bg-red-500 text-white"
          >
            <FontAwesomeIcon icon={faTrash} className="pr-2" />
            Delete Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Employee No</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">License</th>
            </tr>
          </thead>
          <tbody>
            {(filteredEmployees.length > 0
              ? filteredEmployees
              : employees || []
            ).map((employee, index) => (
              <tr
                key={index}
                className={`text-center ${
                  selectedEmployee === employee ? "bg-blue-200 border" : ""
                }`}
                onClick={() => handleRowClick(employee)}
              >
                <td className="border px-4 py-2">{employee.employee_no}</td>
                <td className="border px-4 py-2">{employee.firstname}</td>
                <td className="border px-4 py-2">{employee.lastname}</td>
                <td className="border px-4 py-2">{employee.department}</td>
                <td className="border px-4 py-2">{employee.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default EmployeeDetails;
