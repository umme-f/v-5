import { faTrashCan,faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from "react-i18next";

const DeleteRowModal = ({ isDeleteDialogOpen, confirmDelete, cancelDelete }) => {
  const { t } = useTranslation(); // translates

  if (!isDeleteDialogOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4 font-bold">{t("confirmdelete")}</h2>
        <p className="mb-4">{t("deleteconfirmmessage")}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={cancelDelete} className="border-black rounded px-4 py-2 bg-gray-500 text-white">
            <FontAwesomeIcon icon={faBan} className='pr-1'/>
          {t("cancel")}
          </button>
          <button onClick={confirmDelete} className="border-black rounded px-4 py-2 
          bg-red-500 text-white">
            <FontAwesomeIcon icon={faTrashCan} className='pr-1'/>
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRowModal;
