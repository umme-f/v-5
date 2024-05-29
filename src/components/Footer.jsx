import React from 'react';
import logo from '../assets/images/company-logo.png'; // Adjust the path to your logo image

const Footer = () => {
  return (
   <>
    <div className="bg-gray-100 py-6">
      <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
        <div className="flex flex-col items-center justify-center p-5">
          <img src={logo} alt="Ariake Logo" className="h-10 mb-3" />
          <h3 className="font-bold text-xl text-green-600">Ariake</h3>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-green-600 font-bold">本社</div>
          <p>
            〒861-4108 熊本市南区幸田2丁目7番1号<br />
            TEL.096-381-4000 FAX.096-381-2204
          </p>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-green-600 font-bold">玉名支社</div>
          <p>
            〒865-0061 熊本県玉名市立願寺189-1<br />
            TEL.0968-73-3463 FAX.0968-73-3402
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-800">
    <h1 className="text-zinc-300 font-semibold">@ 2023 All rights reserved | <span className='hover: font-semibold curser-pointer'> Ariake co.,ltd</span></h1>
    </div>
   </>
    
  );
};

export default Footer;
