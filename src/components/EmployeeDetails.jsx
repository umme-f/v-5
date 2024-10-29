import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null); //

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/load_employees",{
            method: "GET",
          }
        ); // Ensure FastAPI is running and this URL is correct
        if (response.ok) {
          const data = await response.json();
          if (data.employees) {
            setEmployees(data.employee);
            setFilteredEmployees(data.employees); // Initialize filtered data

          } else {
            console.error("Employee data not found.");
          }
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
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

  // Handle edit click (navigate to edit page)
  const handleEditClick = () => {
    if (selectedEmployee) {
      navigate(`/edit-employee/${selectedEmployee.employee_no}`, {
        state: { employee: selectedEmployee },
      });
    } else {
      alert("Please select an employee to edit.");
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
            onClick={handleEditClick}
            className="rounded p-2 bg-orange-500 text-white"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="pr-2" />
            Edit Employee
          </button>

          {/* Delete Button */}
          <button
            // delete logic here
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
    </div>
  );
};

export default EmployeeDetails;
