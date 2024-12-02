'use client'

import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import DropdownSearch from './DropdownLibrary';

interface DetailsProps {
    data: { 
        id: number,
        original_name: string,
        youtube_url: string,
        first_air_date: string,
        overview: string,
        vote_average: number,
        saved: boolean
    },
    isModalOpen: boolean;
    library_id?: number;
    library_name?: string;
    openModal: () => void;
    closeModal: () => void;
}

const Details: React.FC<DetailsProps> = ({ data, library_id, library_name, isModalOpen, openModal, closeModal }) => {

    
    const removeFromLibrary = (id: number) => {
        console.log(id);
    }
    return (
        <div>
          {/* Button to toggle modal */}
          {/* Modal */}
          {isModalOpen && (
            <div
              tabIndex={-1}
              aria-hidden="true"
              className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
            >
              <div className="relative p-4 ">
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-black">
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
    
                  {/* Modal Body */}
                  <div className="pt-14">

                    <ReactPlayer
                        url={data.youtube_url}
                        className="react-player"
                        playing
                        width="100%"
                        // height="100%"
                        controls={false}
                        />
                    <h3 className="mb-1 p-5 text-xl font-bold text-gray-900 dark:text-white">
                      {data.original_name}
                    </h3>
                    <p className="text-gray-500 p-5 dark:text-gray-400 mb-6">
                        {data.overview}
                    </p>
                    <div className="flex p-5 justify-between mb-1 text-gray-500 dark:text-gray-400">
                      <span className="text-base font-normal">{data.first_air_date}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Rating: {data.vote_average}
                      </span>
                    </div><script type="module"></script>
                    <div className="flex p-5 justify-end mt-6 space-x-4 rtl:space-x-reverse">

   
                    {!library_id && !library_name ? (
                        <DropdownSearch></DropdownSearch>
                    ) : (

                        data.saved ? (
                            <button
                                onClick={() => removeFromLibrary(data.id)}
                                type="button"
                                // style={{ backgroundColor: '#e50914' }}
                                className="text-white bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-netflixRed dark:text-white dark:hover:bg-white dark:focus:ring-blue-800"
                                >
                                Remove from library
                            </button>
                        ) : (
                            <button
                                onClick={() => removeFromLibrary(data.id)}
                                type="button"
                                // style={{ backgroundColor: '#e50914' }}
                                className="text-white bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-black dark:hover:bg-netflixRed dark:hover:text-white dark:focus:ring-blue-800"
                                >
                                Add to library
                            </button>
                        )
                
                    )}
                      <button
                        onClick={closeModal}
                        type="button"
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default Details;