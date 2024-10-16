import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierDetails = () => {
    const [suppliers, setSuppliers] = useState([]);

    // Fetch supplier data from FastAPI backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/suppliers/')
            .then((response) => {
                setSuppliers(response.data.suppliers);
            })
            .catch((error) => {
                console.error("There was an error fetching the suppliers!", error);
            });
    }, []);

    return (
        <div>
            <h1>Supplier Details</h1>
            {suppliers.length > 0 ? (
                <ul>
                    {suppliers.map((supplier) => (
                        <li key={supplier.supplier_id}>
                            <strong>ID: </strong>{supplier.supplier_id}<br/>
                            <strong>Name: </strong> {supplier.supplier_name}<br />
                            <strong>Receptionist: </strong> {supplier.receptionist}<br />
                            <strong>Phone: </strong> {supplier.tel_no}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No suppliers found.</p>
            )}
        </div>
    );
};

export default SupplierDetails;
