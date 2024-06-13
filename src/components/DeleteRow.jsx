import React from 'react';

const DeleteRow = ({ isDeleteDialogOpen, confirmDelete, cancelDelete }) => {
  if (!isDeleteDialogOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={cancelDelete} className="border border-r-4 border-b-4 border-black rounded px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={confirmDelete} className="border border-r-4 border-b-4 border-black rounded px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRow;
