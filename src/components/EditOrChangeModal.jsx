import React from 'react';

const EditOrChangeModal = ({ isOpen, confirmChange, cancelChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4 font-bold">Confirm Changes</h2>
        <p className="mb-4">Are you sure you want to save these changes?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={cancelChange} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={confirmChange} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrChangeModal;
