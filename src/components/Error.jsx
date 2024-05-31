import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Error = ({ errorType }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-red-500 text-6xl" />
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-lg mb-4">{errorType ? errorType : "An error occurred"}</p>
        </div>
    );
};

export default Error;
