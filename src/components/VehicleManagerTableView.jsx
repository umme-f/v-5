import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus, faEdit, faTrashCan, faMagnifyingGlass, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import CarNotification from './CarNotification';
import UserMenuDropdown from './UserMenuDropdown';
import { useTranslation } from 'react-i18next';
import { FadeLoader } from 'react-spinners';

const VehicleManagerTableView = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSelectRowWarningOpen, setIsSelectRowWarningOpen] = useState(false);
  const [rows, setRows] = useState(data);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [language, setLanguage] = useState('jp');
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const loggedInUser = {
    name: 'A-san'
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    checkUpcomingDates();
    const intervalId = setInterval(() => {
      checkUpcomingDates();
    }, 30000); // Check every 0.5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const checkUpcomingDates = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const upcomingNotifications = rows.filter(row => {
      const rowDate = new Date(row.date);
      return rowDate > today && rowDate < nextMonth;
    });

    setNotifications(upcomingNotifications);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
    setLoading(true); // Start loading when search is initiated

    // Simulate a delay for loading
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 1-second delay
  };

  const handleRowClick = (carID) => {
    setSelectedRow(carID);
  };

  const addButtonClick = () => {
    navigate('/add-button');
  };

  const editButtonClick = () => {
    if (selectedRow !== null) {
      const selectedData = rows.find(row => row.carID === selectedRow);
      navigate('/edit-button', { state: { selectedData } });
    } else {
      alert('Please select a row.');
    }
  };

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

  useEffect(() => {
    setLoading(true);
    // Simulate a delay for loading
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3-second delay
  }, [searchTerm, currentPage]);

  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setLoading(true);
      setCurrentPage(currentPage + 1);

      // Simulate a delay for loading
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1-second delay
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setLoading(true);
      setCurrentPage(currentPage - 1);

      // Simulate a delay for loading
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1-second delay
    }
  };

  const setJapaneseLanguage = () => {
    i18n.changeLanguage('jp');
    setLanguage('jp');
    localStorage.setItem('selectedLanguage', 'jp');
  };

  const setEnglishLanguage = () => {
    i18n.changeLanguage('en');
    setLanguage('en');
    localStorage.setItem('selectedLanguage', 'en');
  };

  const previousLoginPage = () => {
    navigate('/');
  };

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-10">

      {/* Language button */}
      <div className="absolute top-4 right-4 border border-black rounded">
        <button onClick={setJapaneseLanguage} className={`p-2 ${i18n.language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={setEnglishLanguage} className={`p-2 ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
          En
        </button>
      </div>

      {/* Update Notification List */}
      {/* <CarNotification notifications={notifications} rows={rows} setIsModalVisible={setIsModalVisible} /> */}

      {/* User Menu */}
      <div className="absolute top-0 left-0 p-4 flex items-center">
        <UserMenuDropdown
          loggedInUser={loggedInUser}
          showDropdown={showDropdown}
          handleUserClick={handleUserClick}
          handleLogout={handleLogout}
          handleChangePassword={handleChangePassword}
          disableUserMenu={isModalVisible}
          closeDropdown={closeDropdown}
          language={language}
        />
      </div>

      {/* Search box */}
      <div className="w-full md:max-w-4xl">
        <div className="flex flex-col md:flex-row items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-slate-700 rounded p-2 flex-grow mb-2 md:mb-0"
          />
          <button
            onClick={handleSearch}
            className="border border-slate-700 rounded p-2 bg-purple-500 text-white mb-2 md:mb-0 md:ml-2 mr-2 pr-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2" />
            {t('search')}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mb-3 w-full md:max-w-4xl mt-4">
        {loading ? (
          <div className="flex justify-center">
            <FadeLoader color="#808d8a" size={15}/>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow-inner">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 text-center">ID</th>
                <th className="py-2 px-4 border border-gray-300 text-center">{t("carname")}</th>
                <th className="py-2 px-4 border border-gray-300 text-center">{t("year")}</th>
                <th className="py-2 px-4 border border-gray-300 text-center">{t("role")}</th>
                <th className="py-2 px-4 border border-gray-300 text-center">{t("nextupdatedate")}</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((row) => (
                <tr
                  key={row.carID}
                  className={`cursor-pointer ${
                    row.carID === selectedRow ? 'border-4 border-black rounded bg-sky-200' : currentPageData.indexOf(row) % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                  }`}
                  onClick={() => handleRowClick(row.carID)}
                >
                  <td className="py-2 px-4 border-r border-gray-300 text-center">{row.carID}</td>
                  <td className="py-2 px-4 border-r border-gray-300 text-center">{row.carName}</td>
                  <td className="py-2 px-4 border-r border-gray-300 text-center">{row.year}</td>
                  <td className="py-2 px-4 border-r border-gray-300 text-center">{row.role}</td>
                  <td className="py-2 px-4 border-r border-gray-300 text-center">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Next and previous page button */}
      <div className="flex justify-between w-full md:max-w-4xl mt-4 space-x-4">
        <div className="flex space-x-4">
          <button onClick={handlePreviousPage} disabled={currentPage === 0} className="border border-slate-700 rounded p-4 bg-green-500 text-white rounded disabled:opacity-50">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={handleNextPage} disabled={currentPage >= pageCount - 1} className="border border-slate-700 rounded p-4 bg-green-500 text-white rounded disabled:opacity-50">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/*4 Buttons */}
        <div className="flex space-x-4">
          <button onClick={addButtonClick} className="border border-slate-700 rounded p-4 bg-blue-500 text-white rounded">
            <FontAwesomeIcon icon={faPlus} className="pr-2" />
            {t('add')}
          </button>
          <button onClick={editButtonClick} className="border border-slate-700 rounded p-4 bg-yellow-500 text-white rounded">
            <FontAwesomeIcon icon={faEdit} className="pr-2" />
            {t('edit')}
          </button>
          <button onClick={deleteButtonClick} className="border border-slate-700 rounded p-4 bg-red-500 text-white rounded">
            <FontAwesomeIcon icon={faTrashCan} className="pr-2" />
            {t('delete')}
          </button>
          <button onClick={previousLoginPage} className="border border-slate-700 rounded p-4 bg-gray-500 text-white rounded">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="pr-2" />
            {t('previousPage')}
          </button>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">{t("confirmdelete")}</h2>
            <p className="mb-4">{t("deleteconfirmmessage")}</p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelDelete} className="border border-black rounded px-4 py-2 bg-gray-500 text-white rounded">
              <FontAwesomeIcon icon={faCircleArrowLeft} className='pr-2'/>
              {t("cancel")}
              </button>
              <button onClick={confirmDelete} className="border border-black rounded px-4 py-2 bg-red-500 text-white rounded">
                <FontAwesomeIcon icon={faTrashCan} className="pr-2" />
                {t("delete")}
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
    </div>
  );
};

export default VehicleManagerTableView;
