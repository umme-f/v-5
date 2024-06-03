import React, {useEffect, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Show warning about pending update
const UpdateWarning = () => {
    const [showUpdatePending, setShowUpdatePending] = useState(false);

        useEffect(() =>{
            const timer = setTimeout(() => {
            setShowUpdatePending(false);
            }, 3000);

            return () =>{
            clearTimeout(timer);
            };
        }, []);

        useEffect(() => {
            if (!showUpdatePending) {
            toast.error('Update information (更新が保留中です。)', {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined
            });
            }
        }, [showUpdatePending]);

    return (
        <div>                   
            <ToastContainer />
        </div>
        
    );
};

export default UpdateWarning;