import React, { createContext, useState, useEffect } from "react";

// Create the context
const FileContext = createContext();

// Create a provider component
export const FileProvider = ({ children }) => {
  const [fileDetails, setFileDetails] = useState([]);

  useEffect(() => {
    // Load saved file details from localStorage when the component mounts
    const savedFiles = localStorage.getItem("fileDetails");
    if (savedFiles) {
      setFileDetails(JSON.parse(savedFiles));
    }
  }, []);

  useEffect(() => {
    // Save file details to localStorage whenever it changes
    localStorage.setItem("fileDetails", JSON.stringify(fileDetails));
  }, [fileDetails]);

  // Function to add a new file
  const addFile = (index, column, newFileDetail) => {
    const updatedFileDetails = [...fileDetails];
    if (!updatedFileDetails[index]) {
      updatedFileDetails[index] = {};
    }
    updatedFileDetails[index][column] = newFileDetail;
    setFileDetails(updatedFileDetails);
  };

  // Function to delete a file
  const deleteFile = (index, column) => {
    const updatedFileDetails = [...fileDetails];
    delete updatedFileDetails[index][column];
    setFileDetails(updatedFileDetails);
  };

  // Function to add a new row
  const addRow = () => {
    setFileDetails([...fileDetails, {}]);
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const updatedFileDetails = fileDetails.filter((_, i) => i !== index);
    setFileDetails(updatedFileDetails);
  };

  return (
    <FileContext.Provider
      value={{
        fileDetails,
        addFile,
        deleteFile,
        addRow,
        deleteRow,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

// Export the custom hook
export const useFileContext = () => React.useContext(FileContext);
