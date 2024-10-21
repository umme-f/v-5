import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; //useTranslation hook
import { useNavigate } from "react-router-dom";

const MoreInformation = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("jp");
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  //  Set language to Japanese
  const setJapaneseLanguage = () => {
    i18n.changeLanguage("jp");
    setLanguage("jp");
    localStorage.setItem("selectedLanguage", "jp");
  };
  //  Set language to English
  const setEnglishLanguage = () => {
    i18n.changeLanguage("en");
    setLanguage("en");
    localStorage.setItem("selectedLanguage", "en");
  };
  const toVehicleDetails = () => {
    navigate("/vehicle-details");
  };
  const toSupplierDetails = () => {
    navigate("/supplier-details");
  };
  const toVehicleManagerDetails = () => {
    navigate("/vehicle-manager-details");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Language button */}
      <div className="absolute top-4 right-4 rounded">
        <button
          onClick={setJapaneseLanguage}
          className={`p-2 ${
            i18n.language === "jp" ? "bg-blue-600 text-white" : "bg-gray-400"
          } text-xs uppercase font-bold rounded-l`}
        >
          日本語
        </button>
        <button
          onClick={setEnglishLanguage}
          className={`p-2 ${
            i18n.language === "en" ? "bg-blue-600 text-white" : "bg-gray-400"
          } text-xs uppercase font-bold rounded-r`}
        >
          En
        </button>
      </div>
      <div className="container mx-auto grid grid-cols-1 p-6 md:grid-cols-3 gap-6">
        {/* Vehicle details */}
        <div className="w-full max-w-full md:max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
            {t("VehicleDetails")}
          </h5>
          {/* Align button to left */}
          <div className="flex justify-start">
            <button
              onClick={toVehicleDetails}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("ReadMore")}
            </button>
          </div>
        </div>

        {/* Supplier details */}
        <div className="w-full max-w-full md:max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
            {t("Supplier Details")}
          </h5>
          {/* Align button to left */}
          <div className="flex justify-start">
            <button
              onClick={toSupplierDetails}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("ReadMore")}
            </button>
          </div>
        </div>

        {/* User details */}
        <div className="w-full max-w-full md:max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
            {t("User Details")}
          </h5>
          {/* Align button to left */}
          <div className="flex justify-start">
            <button
              href="#"
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("ReadMore")}
            </button>
          </div>
        </div>

        {/* Vehicle Manager details */}
        <div className="w-full max-w-full md:max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
            {t("Vehicle Manager Details")}
          </h5>
          {/* Align button to left */}
          <div className="flex justify-start">
            <button
              onClick={toVehicleManagerDetails}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("ReadMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInformation;
