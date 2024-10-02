import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

const UserMenuDropdown = ({ loggedInUser, showDropdown, handleUserClick, handleLogout, disableUserMenu, closeDropdown, language }) => {
  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleUserClick} disabled={disableUserMenu} className={disableUserMenu ? 'opacity-50 cursor-not-allowed' : ''}>
        <FontAwesomeIcon icon={faUser} className="bg-slate-100 hover:bg-slate-300 rounded text-4xl text-gray-700 pl-5 pr-4 " />
      </button>
      <span className="ml-2 mt-2">{loggedInUser.name}</span>
      {showDropdown && !disableUserMenu && (
        <div className="absolute top-10 left-5 mt-2 w-48 bg-white border border-gray-400 rounded shadow-lg z-50">
          <ul className="list-none p-2">
            {/* Display the logged-in user's name */}
            <li className="p-2 border-b border-gray-200">{loggedInUser.name}</li>

            {/* Logout button */}
            <li className="p-2 cursor-pointer hover:bg-gray-100">
              <button onClick={handleLogout} className="w-full text-left">
                <FontAwesomeIcon icon={faRightFromBracket} className="pr-2" />
                {language === 'jp' ? 'ログアウト' : 'Logout'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;
