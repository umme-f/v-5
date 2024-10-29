import React, { useState, useEffect }from "react";
import  { toast, ToastContainer} from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import EditOrChangeModal from "./EditOrChangeModal";
const EditEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { employee } = location.state || {};

    // Initialize state
  const [employeeData, setEmployeeData] = useState({
    employee_no: employee?.employee_no || "",
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    department: employee?.department || "",
    license: employee?.license || "",
  });

// The confirmation modal after changing or editing data

  const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);


// Fetch employee data if not available in location state
useEffect(() => {
    if (!employee) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/get_employee/${employee.employee_no}`
          );
          if (response.ok) {
            const data = await response.json();
            setEmployeeData(data);
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
      fetchEmployeeData();
    }
  }, [employee]);

   // Input change
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
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
        `http://localhost:8000/api/employees/${employeeData.employee_no}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (response.ok) {
        toast.success("Employee saved successfully!", {
                    position: "top-right",
                    autoClose: 3000, // Auto close after 3seconds
                    onClose: () => navigate("/employee-details"), // Navigate back to the previous page after toast closes
                });
      } else {
        const errorData = await response.json();
        
        toast.error(`Failed to update employee data: ${errorData.detail}`);
        // alert(`Failed to update supplier data: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/employee-details");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <ToastContainer />
      {employeeData ? (
        <>
          <form className="space-y-4">
            <div className="text-sm font-medium">
             Employee No
              <input
                type="number"
                name="supplier_no"
                value={employeeData.employee_no}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
                readOnly
              />
            </div>

            <div className="text-sm font-medium">
             First Name
              <input
                type="text"
                name="first_name"
                value={employeeData.first_name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="text-sm font-medium">
              Last Name
              <input
                type="text"
                name="last_name"
                value={employeeData.last_name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="text-sm font-medium">
              Department
              <input
                type="text"
                name="department"
                value={employeeData.department}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="text-sm font-medium">
              License
              <input
                type="text"
                name="license"
                value={employeeData.license}
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
                Save Employee
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

export default EditEmployee;
