'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Library } from '../types/Library';  // Assume the types are defined in a separate file

interface MovieContextType {
  details: any;
  posterPathsTrendingMovies: any;
  posterPathsTrendingShows: any;
  postPathsTopRatedShows: any;
  posterPathsTopRatedMovies: any;
  userLibraries: Library[];
  getUserLibraries: () => void;
  fetchMovieDetail: () => void;  // Include the function to update the details
}

const defaultMovieContext: MovieContextType = {
    details: null,
    posterPathsTrendingMovies: null,
    posterPathsTrendingShows: null,
    postPathsTopRatedShows: null,
    posterPathsTopRatedMovies: null,
    userLibraries: [],
    getUserLibraries: () => {},
    fetchMovieDetail: () => {},
};
  
interface MediaItem {
    poster_path: string;
    media_type: string;
    id: number;
}

const MovieContext = createContext<MovieContextType>(defaultMovieContext);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [details, setDetails] = useState<any>(null);
  const [posterPathsTrendingMovies, setPosterPathsTrendingMovies] = useState<MediaItem[] | null>(null);
  const [posterPathsTrendingShows, setPosterPathsTrendingShows] = useState<MediaItem[] | null>(null);
  const [postPathsTopRatedShows, setPostPathsTopRatedShows] = useState<MediaItem[] | null>(null);
  const [posterPathsTopRatedMovies, setPosterPathsTopRatedMovies] = useState<MediaItem[] | null>(null);
  const [userLibraries, setUserLibraries] = useState<Library[]>([]);

  useEffect(() => {
    getTrendingMovies();
    getTrendingShows();
    getTopRatedShows();
    getTopRatedMovies();
    getUserLibraries();
  }, []);

  const fetchMovieDetail = async () => {
    setDetails({
      poster_path: "glen",
      first_air_date: "test",
      original_name: "test",
      overview: "test",
      vote_average: 7,
    });
  };

    const getTrendingMovies = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/trending/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setPosterPathsTrendingMovies(data);
        }
    };

    const getTrendingShows = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/trending/shows`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setPosterPathsTrendingShows(data);
        }
    };

    const getTopRatedMovies = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/top-rated/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setPosterPathsTopRatedMovies(data);
        }
    };

    const getTopRatedShows = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/top-rated/shows`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setPostPathsTopRatedShows(data);
        }
    };


    const getUserLibraries = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            
            const res = await fetch(`http://localhost:3001/api/libraries`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            });
        
            if (res.ok) {
                if (res.status === 204) {
                    console.log('No content available.');
                    return;
                }
                const data: Library[] = await res.json()

                setUserLibraries(data)
            }
        }
    }

  return (
    <MovieContext.Provider value={{ 
        details,
        posterPathsTrendingMovies, 
        posterPathsTrendingShows, 
        postPathsTopRatedShows, 
        posterPathsTopRatedMovies,
        userLibraries,
        getUserLibraries,
        fetchMovieDetail     
    }}>

      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = (): MovieContextType => {
    const context = useContext(MovieContext);
    if (!context) {
      throw new Error('useMovie must be used within a MovieProvider');
    }
    return context;
  };