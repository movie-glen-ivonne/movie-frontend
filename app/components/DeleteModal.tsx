import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6 text-sm text-gray-600">
                    Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;