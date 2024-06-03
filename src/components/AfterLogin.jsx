import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import imageSurvey from '../assets/images/survey.jpg';
import imageVehicle from '../assets/images/car.jpg';

function AfterLogin() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg transition-all duration-700 hover:scale-110">
          <img className="w-full" src={imageSurvey} alt="Survey" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Survey</div>
          </div>
          <div className="px-6 pt-4 pb-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View</button>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg transition-all duration-700 hover:scale-110">
          <img className="w-full" src={imageVehicle} alt="Vehicle" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Vehicle</div>
          </div>
          <div className="px-6 pt-4 pb-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterLogin;
