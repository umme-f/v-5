import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus, faCircleUser, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import data from './data.json';
import UpdateWarning from './UpdateWarning';

const VehicleManagerTableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const loggedInUser = {
    name: 'A- san' 
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); 
  };

  const filteredData = data.filter(row => row.carName.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <div className="absolute top-0 right-0 p-4 flex items-center">
        <Link to="#">
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl text-gray-700" />
        </Link>
        <span className="ml-2 mt-2">{loggedInUser.name}</span>
      </div>
      <div className="w-full md:max-w-4xl">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-l flex-grow mb-2 md:mb-0"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white mb-2 md:mb-0 md:ml-2 mr-2 pr-2"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2" />
            Search
          </button>
          <Link to='/add-people'>
            <button className="p-2 bg-orange-500 text-white rounded-r">
              <FontAwesomeIcon icon={faUserPlus} className="pr-2" />
              Add People
            </button>
          </Link>
        </div>
      </div>

      {/* Table view */}
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
            {currentPageData.map((row, index) => (
              <tr key={index} className="border-b border-gray-300">
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
      <div className="flex justify-center w-full md:max-w-4xl mt-4 space-x-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 0} className="p-4 bg-green-500 text-white rounded disabled:opacity-50">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={handleNextPage} disabled={currentPage >= pageCount - 1} className="p-4 bg-green-500 text-white rounded disabled:opacity-50">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <UpdateWarning />
    </div>
  );
};

export default VehicleManagerTableView;
