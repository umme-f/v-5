import React from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPeople = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="w-full max-w-sm">
                <div className="mb-6">
                    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2" htmlFor="inline-id">
                        ID
                    </label>
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" 
                        id="inline-id" 
                        type="text" 
                    />
                </div>
                <div className="mb-6">
                    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2" htmlFor="inline-car-name">
                        Car Name
                    </label>
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" 
                        id="inline-car-name" 
                        type="text" 
                    />
                </div>
                <div className="mb-6">
                    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2" htmlFor="inline-year">
                        Year
                    </label>
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" 
                        id="inline-year" 
                        type="text" 
                    />
                </div>
                <div className="mb-6">
                    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-500 font-bold mb-2" htmlFor="inline-role">
                        Role
                    </label>
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" 
                        id="inline-role" 
                        type="text"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    <FontAwesomeIcon icon={faUserPlus} className="pr-2" />Add new member</button>
                </div>
            </form>  
        </div>
    );
};

export default AddPeople;
