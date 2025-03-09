import React from 'react';

const ConfirmPopup = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-50">
            <div className="bg-white p-6 shadow-lg">
                <div className="mb-4">{children}</div>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 cursor-pointer">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;