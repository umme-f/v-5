import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleUser, faChevronLeft, faChevronRight, faPlus, faEdit, faTrashCan, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import UpdateWarning from './UpdateWarning';

const VehicleManagerTableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSelectRowWarningOpen, setIsSelectRowWarningOpen] = useState(false);
  const [rows, setRows] = useState(data);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const loggedInUser = {
    name: 'A-san'
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  // handle row click
  const handleRowClick = (carID) => {
    setSelectedRow(carID);
  };

  // Handle add button click
  const addButtonClick = () => {
    navigate('/add-button');
  };

  // Handle edit button click
  const editButtonClick = () => {
    if (selectedRow !== null) {
      const selectedData = rows.find(row => row.carID === selectedRow);
      navigate('/edit-button', { state: { selectedData } });
    } else {
      alert('Please select a row');
    }
  };

  // Handle delete button click
  const deleteButtonClick = () => {
    if (selectedRow !== null) {
      setIsDeleteDialogOpen(true);
    } else {
      setIsSelectRowWarningOpen(true);
    }
  };

  const confirmDelete = () => {
    setRows(rows.filter(row => row.carID !== selectedRow));
    setSelectedRow(null);
    setIsDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const closeSelectRowWarning = () => {
    setIsSelectRowWarningOpen(false);
  };

  const filteredData = rows.filter(row => row.carName.toLowerCase().includes(searchTerm.toLowerCase()));
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentPageData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="absolute top-0 left-0 p-4 flex items-center">
        <button to="#">
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl text-gray-700" />
        </button>
        <span className="ml-2 mt-2">{loggedInUser.name}</span>
      </div>
      <div className="w-full md:max-w-4xl">
        <div className="flex flex-col md:flex-row items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-l flex-grow mb-2 md:mb-0"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white mb-2 md:mb-0 md:ml-2 mr-2 pr-2 rounded">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2" />
            検索
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full md:max-w-4xl mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300 text-center">ID</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Car name</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Year</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row) => (
              <tr
                key={row.carID}
                className={`cursor-pointer ${row.carID === selectedRow ? 'bg-blue-200' : currentPageData.indexOf(row) % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                onClick={() => handleRowClick(row.carID)}
              >
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {row.carID}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {row.carName}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {row.year}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {row.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between w-full md:max-w-4xl mt-4 space-x-4">
        <div className="flex space-x-4">
          <button onClick={handlePreviousPage} disabled={currentPage === 0} className="p-4 bg-green-500 text-white rounded disabled:opacity-50">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={handleNextPage} disabled={currentPage >= pageCount - 1} className="p-4 bg-green-500 text-white rounded disabled:opacity-50">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="flex space-x-4">
          <button onClick={addButtonClick} className="p-4 bg-blue-500 text-white rounded">
            <FontAwesomeIcon icon={faPlus} className='pr-2'/>
            Add
          </button>
          <button onClick={editButtonClick} className="p-4 bg-yellow-500 text-white rounded">
            <FontAwesomeIcon icon={faEdit} className='pr-2'/>
            Edit
          </button>
          <button onClick={deleteButtonClick} className="p-4 bg-red-500 text-white rounded">
            <FontAwesomeIcon icon={faTrashCan} className='pr-2'/>
            Delete
          </button>
          <button className="p-4 bg-gray-500 text-white rounded">
            <FontAwesomeIcon icon={faCircleXmark} className='pr-2' />
            Close
          </button>
        </div>
      </div>

    
    {/* fixed inset-0 spans the whole screen and appear at front*/}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md" >
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded" >
                <FontAwesomeIcon icon={faTrashCan} className='pr-2'/>Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isSelectRowWarningOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">No Row Selected</h2>
            <p className="mb-4">Please select a row before deleting.</p>
            <div className="flex justify-end">
              <button onClick={closeSelectRowWarning} className="px-4 py-2 bg-gray-500 text-white rounded">
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      <UpdateWarning />
    </div>
  );
};

export default VehicleManagerTableView;
