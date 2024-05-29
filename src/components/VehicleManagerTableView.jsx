import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VehicleManagerTableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([
    { ID: 1, name: 'toyota',  year:'2012', role: 'VM' },
    { ID: 2, name: 'daihatsu', year: '2019', role: 'User' },
  ]);
  const [editIdx, setEditIdx] = useState(-1);

  const loggedInUser = {
    name: 'VM',
    avatar: 'https://via.placeholder.com/40',
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const startEditing = (index) => {
    setEditIdx(index);
  };

  const stopEditing = () => {
    setEditIdx(-1);
  };

  const handleEditChange = (event, index, field) => {
    const newData = data.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: event.target.value };
      }
      return row;
    });
    setData(newData);
  };

  const filteredData = data.filter(
    row =>
      row.ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="absolute top-0 right-0 p-4 flex items-center">
        <Link to="#">
          <img
            src={loggedInUser.avatar}
            alt={loggedInUser.name}
            className="w-10 h-10 rounded-full"
          />
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
            className="p-2 bg-blue-500 text-white mb-2 md:mb-0 md:ml-2 pr-2"
          >
            Search
          </button>
          <button
            className="p-2 bg-orange-500 text-white rounded ml-auto"
          >
            Add People
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
              <th className="py-2 px-4 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.ID} className="border-b border-gray-300">
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {editIdx === index ? (
                    <input
                      type="text"
                      value={row.ID}
                      onChange={(e) => handleEditChange(e, index, 'ID')}
                      className="p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    row.ID
                  )}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {editIdx === index ? (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleEditChange(e, index, 'name')}
                      className="p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {editIdx === index ? (
                    <input
                      type="text"
                      value={row.year}
                      onChange={(e) => handleEditChange(e, index, 'role')}
                      className="p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    row.year
                  )}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {editIdx === index ? (
                    <input
                      type="text"
                      value={row.role}
                      onChange={(e) => handleEditChange(e, index, 'role')}
                      className="p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    row.role
                  )}
                </td>
                <td className="py-2 px-4 border-r border-gray-300 text-center">
                  {editIdx === index ? (
                    <button
                      onClick={stopEditing}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(index)}
                      className="p-2 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleManagerTableView;
