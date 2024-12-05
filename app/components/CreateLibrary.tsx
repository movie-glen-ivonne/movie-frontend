'use client'

import React, { useState } from 'react';
import { useMovie } from '../context/MovieContext';

interface DetailsProps {
    isCreateLibraryModalOpen: boolean;
    closeCreateLibraryModal: () => void;
    showToast: (message: string, type: 'success' | 'error') => void; // Add this prop

}

const CreateLibrary: React.FC<DetailsProps> = ({ isCreateLibraryModalOpen, closeCreateLibraryModal, showToast }) => {
    const [libraryName, setLibraryName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { getUserLibraries } = useMovie();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLibraryName(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!libraryName) {
            alert('Please enter a library name');
            return;
        }

        const payload = {
            name: libraryName
        };

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('https://movie-project-bk-630243095989.us-central1.run.app/api/libraries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Library created:', result);

                    setErrorMessage('')
                    setLibraryName('')
                    closeCreateLibraryModal();
                    showToast('Library was added successfully!', 'success');
                    await getUserLibraries();
                } else {
                    const result = await response.json();
                    setErrorMessage(result.message)
                    showToast('Error creating library', 'error');
                }
            } catch (error) {
                showToast('Error creating library', 'error');
                console.log(error);
            }
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
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errorMessage !== "" && (

                                            <p className="text-xs text-red-500 flex items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2"
                                                    viewBox="0 0 512 512">
                                                    <path
                                                        d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.046 216.341 216.341S375.275 472.341 256 472.341z"
                                                        data-original="#000000" />
                                                </svg>
                                                {errorMessage}
                                            </p>
                                        )}
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