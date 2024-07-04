import React, { useState } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPeople = () => {
  const [language, setLanguage] = useState('jp');

  // Function to toggle between English and Japanese
  const setEnglishLanguage = () => {
    setLanguage('en');
  };

  const setJapaneseLanguage = () => {
    setLanguage('jp');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Language toggle buttons */}
      <div className="absolute top-4 right-4 border border-black rounded">
        <button
          onClick={setJapaneseLanguage}
          className={`p-2 ${language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}
        >
          日本語
        </button>
        <button
          onClick={setEnglishLanguage}
          className={`p-2 ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}
        >
          En
        </button>
      </div>
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <form>
          <div className="mb-6">
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2"
              htmlFor="inline-id"
            >
              ID
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="inline-id"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2"
              htmlFor="inline-car-name"
            >
              Car Name
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="inline-car-name"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2"
              htmlFor="inline-year"
            >
              Year
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="inline-year"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2"
              htmlFor="inline-role"
            >
              Role
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="inline-role"
              type="text"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              <FontAwesomeIcon icon={faUserPlus} className="pr-2" />
              {language === 'en' ? 'Add new member' : '新しいメンバーを追加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPeople;
