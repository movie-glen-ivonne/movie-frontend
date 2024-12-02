import React, { useState } from 'react';

const libraries = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Romance' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Drama' },
    { id: 6, name: 'Sci-Fi' },
    { id: 7, name: 'Fantasy' }
];

const DropdownSearch: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);  // Tracks if dropdown is open or closed
    const [searchTerm, setSearchTerm] = useState('');  // Tracks the search input
    const [selectedLibraries, setSelectedLibraries] = useState<Set<number>>(new Set());  // Tracks selected libraries

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCheckboxChange = (libraryId: number) => {
        setSelectedLibraries(prevSelectedLibraries => {
            const updatedLibraries = new Set(prevSelectedLibraries);
            if (updatedLibraries.has(libraryId)) {
                updatedLibraries.delete(libraryId);  // Unselect library
            } else {
                updatedLibraries.add(libraryId);  // Select library
            }
            return updatedLibraries;
        });
    };

    const filteredLibraries = libraries.filter(library =>
        library.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <button
                id="dropdownSearchButton"
                onClick={() => setIsOpen(!isOpen)}  // Toggle dropdown visibility
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-netflixRed dark:hover:bg-red-700 dark:focus:ring-blue-800"
                type="button"
            >
                Add to library
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div id="dropdownSearch" className="z-10 absolute bottom-full bg-white rounded-lg shadow w-60 dark:bg-black mt-2">
                    <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="input-group-search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-700 dark:text-black dark:focus:ring-black-500 dark:focus:border-blue-500"
                                placeholder="Search library"
                            />
                        </div>
                    </div>

                    {/* Filtered Libraries List */}
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                        {filteredLibraries.map((library) => (
                            <li key={library.id}>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id={`checkbox-item-${library.id}`}
                                        type="checkbox"
                                        checked={selectedLibraries.has(library.id)}
                                        onChange={() => handleCheckboxChange(library.id)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label htmlFor={`checkbox-item-${library.id}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        {library.name}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownSearch;