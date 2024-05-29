import React, { useState } from 'react';

const UserTableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'VM' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]);
  const [editIdx, setEditIdx] = useState(-1);

  const loggedInUser = {
    name: 'Non VM',
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
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10">
      <div className="absolute top-0 right-0 p-4 flex items-center">

{/* Make it link later */}
<img
  src={loggedInUser.avatar}
  alt={loggedInUser.name}
  className="w-10 h-10 rounded-full mt-5"
/>
<span className="ml-2 mr-8 mt-5">{loggedInUser.name}</span>
</div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-r"
        >
          Search
        </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300">Name</th>
            <th className="py-2 px-4 border border-gray-300">Email</th>
            <th className="py-2 px-4 border border-gray-300">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={row.id} className="border-b border-gray-300">
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
                    value={row.email}
                    onChange={(e) => handleEditChange(e, index, 'email')}
                    className="p-2 border border-gray-300 rounded"
                  />
                ) : (
                  row.email
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
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableView;
