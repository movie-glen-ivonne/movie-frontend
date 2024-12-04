'use client'

import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import DropdownSearch from './DropdownLibrary';
import { MediaItem } from '../types/Library';
import Toast from './Toast';

interface Movie {
    id: number;
    original_name: string;
    poster_path: string;
    first_air_date: string;
    overview: string;
}


interface DetailsProps {
    data: { 
        id: number,
        poster_path: string,
        original_name: string,
        video_url: string,
        media_type: string,
        first_air_date: string,
        overview: string,
        vote_average: number,
        saved: boolean,
    },
    isModalOpen: boolean;
    library_id?: number | null;
    library_name?: string | null;
    // openModal: () => void;
    closeModal: () => void;
    removeFromSwiper: (id: number) => void;
    addToSwiper: (movie: MediaItem) => void;
}

const Details: React.FC<DetailsProps> = ({ data, library_id, library_name, isModalOpen, closeModal, removeFromSwiper, addToSwiper }) => {

    const [showToast, setShowToast] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const addMovieToLibrary = async (libraryId: any, movie: any) => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('here2ee');
            try {
                console.log(movie);
                const res = await fetch(`http://localhost:3001/api/managelibrary/add`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        libraryId,
                        movie: {
                            id: movie.id,
                            original_name: movie.original_name,
                            first_air_date: movie.first_air_date,
                            poster_path: movie.poster_path,
                            overview: movie.overview,
                            vote_average: movie.vote_average,
                            video_url: movie.video_url,
                            media_type: movie.media_type,
                            saved: true,
                        }
                    }),
                });
    
                if (res.ok) {
                    setIsError(false);
                    setMessage('Movie added to the library!');
                    data.saved = true
                    addToSwiper({
                        poster_path: data.poster_path,
                        id: data.id,
                        media_type: data.media_type,
                      });
                } else {
                    const errorData = await res.json();
                    setIsError(true);
                    setMessage(errorData.message || 'Failed to add movie to library!');
                }
            } catch (error) {
                console.log(error);
                setIsError(true);
                setMessage('An error occurred while adding the movie.');
            } finally {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 4000);
            }
        }
    };
    const removeMovieFromLibrary = async (libraryId: any, movie: Movie) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                console.log('hereee');
                const res = await fetch(`http://localhost:3001/api/managelibrary/remove`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        libraryId,
                        idMovie: data.id,
                    }),
                });
    
                if (res.ok) {
                    setIsError(false);
                    setMessage('Movie removed from the library!');
                    data.saved = false
                    removeFromSwiper(data.id);
                } else {
                    const errorData = await res.json();
                    setIsError(true);
                    setMessage(errorData.message || 'Failed to remove from library!');
                }
            } catch (error) {
                setIsError(true);
                console.log(error);
                setMessage('An error occurred while removing from library.');
            } finally {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 4000);
            }
        }
    };
    return (
        <div>
          {/* Button to toggle modal */}
          {/* Modal */}
          {isModalOpen && (
            <div
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="relative p-[300px] ">
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

                    {data.video_url !== "" && (

                        <ReactPlayer
                            url={data.video_url}
                            className="react-player"
                            playing
                            width="100%"
                            // height="100%"
                            controls={false}
                            />
                    )}
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
                        <DropdownSearch movie={data}></DropdownSearch>
                    ) : (

                        data.saved ? (
                            <button
                                onClick={() => removeMovieFromLibrary(library_id, data)}
                                type="button"
                                className="text-white bg-white-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-netflixRed dark:text-white dark:hover:bg-red dark:hover:text-white"
                                >
                                Remove from library
                            </button>
                        ) : (
                            <button
                                onClick={() => addMovieToLibrary(library_id, data)}
                                type="button"
                                className="text-white bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-black dark:hover:bg-netflixRed dark:hover:text-white dark:focus:ring-blue-800"
                                >
                                Add to library
                            </button>
                        )
                    )}
                      <button
                        onClick={closeModal}
                        type="button"
                        className="py-1.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {showToast && (
                <Toast 
                    message={message} 
                    onClose={() => setShowToast(false)} 
                    type={isError ? 'error' : 'success'}
                />
            )}
            </div>
          )}
        </div>
      );
}

export default Details;