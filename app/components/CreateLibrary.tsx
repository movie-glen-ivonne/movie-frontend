'use client'

import React, { useState } from 'react';

interface DetailsProps {
    isCreateLibraryModalOpen: boolean;
    openCreateLibraryModal: () => void;
    closeCreateLibraryModal: () => void;
}

const CreateLibrary: React.FC<DetailsProps> = ({ isCreateLibraryModalOpen, openCreateLibraryModal, closeCreateLibraryModal }) => {
    const [libraryName, setLibraryName] = useState('');
    

    // Handle input change for the library name
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLibraryName(event.target.value);
    };

    // Handle form submission
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!libraryName) {
            // Optionally, show an error message if the input is empty
            alert('Please enter a library name');
            return;
        }

        // Create the payload to send in the POST request
        const payload = {
            library_name: libraryName
        };

        try {
            // Send the POST request with the library name
            const response = await fetch('/api/create-library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Library created:', result);
                // Optionally, close the modal or reset the form
                closeCreateLibraryModal();
            } else {
                console.error('Error creating library:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {isCreateLibraryModalOpen && (
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-black">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create Library</h3>
                                <button
                                    type="button"
                                    onClick={closeCreateLibraryModal}  // Close modal when clicked
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleFormSubmit}>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-black-900 dark:text-white">Library name</label>
                                        <input
                                            type="text"
                                            name="library"
                                            id="library"
                                            className="bg-white border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                                            placeholder="Horror"
                                            value={libraryName}
                                            onChange={handleInputChange} // Capture the input value
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        style={{ backgroundColor: '#e50914' }}
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Create Library
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateLibrary;