import React from 'react';
import error_icon from '../assets/images/error-icon-fa.png'
const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <img src={error_icon}alt="Error Icon" className="mb-4 w-16 h-16" />
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-lg mb-4">Page Not Found</p>
            
        </div>
    );
};

export default Error;
