import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; //useTranslation hook
import { Navigate, useNavigate } from "react-router-dom";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vehicle details */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-5">
            {t("VehicleDetails")}
          </h5>

          {/* Center the button */}
          <div className="flex justify-center">
            <button
              onClick={toVehicleDetails}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("ReadMore")}
            </button>
          </div>
        </div>

        {/* Supplier details */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-5">
              {t("Supplier Details")}
            </h5>
          </div>
          {/* Center the button */}
          <div className="flex justify-center">
            <button
              onClick={toSupplierDetails}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("Read more")}
            </button>
          </div>
        </div>

        {/* User details */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-5">
              {t("User Details")}
            </h5>
          </div>
          {/* Center the button */}
          <div className="flex justify-center">
            <button
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("Read more")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInformation;
