'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

interface MovieContextType {
  details: any;
  posterPathsTrendingMovies: any;
  posterPathsTrendingShows: any;
  postPathsTopRatedShows: any;
  posterPathsTopRatedMovies: any;
  fetchMovieDetail: () => void;  // Include the function to update the details
}

interface MediaItem {
    poster_path: string;
    media_type: string;
    id: number;
}

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [details, setDetails] = useState<any>(null);
  const [posterPathsTrendingMovies, setPosterPathsTrendingMovies] = useState<MediaItem[] | null>(null);
  const [posterPathsTrendingShows, setPosterPathsTrendingShows] = useState<MediaItem[] | null>(null);
  const [postPathsTopRatedShows, setPostPathsTopRatedShows] = useState<MediaItem[] | null>(null);
  const [posterPathsTopRatedMovies, setPosterPathsTopRatedMovies] = useState<MediaItem[] | null>(null);


  useEffect(() => {
    getTrendingMovies();
    getTrendingShows();
    getTopRatedTVShows();
    getTopRatedMovies();
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
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5ZmVhOTU5YWJmMmNjNDY1ZTAzMDIzY2ZkMGRmMCIsIm5iZiI6MTczMjc4NDMxNS45Mjc4NzI3LCJzdWIiOiI2NzQwOTQ5MTVjYWMwNDFjZmFlMjgxODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vJNBXM5_i9wgt1cunX51nV9ti8wdqWCPL7ZPZWkHir8` },
    });

    if (res.ok) {

      const data = await res.json();
      const data_serialized = (data.results as MediaItem[])
      .filter(item => item.poster_path !== null)
      .map(item => ({
        poster_path: item.poster_path,
        media_type: 'movie',
        id: item.id
      }));

      setPosterPathsTrendingMovies(data_serialized)
    }

  }
  const getTrendingShows = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5ZmVhOTU5YWJmMmNjNDY1ZTAzMDIzY2ZkMGRmMCIsIm5iZiI6MTczMjc4NDMxNS45Mjc4NzI3LCJzdWIiOiI2NzQwOTQ5MTVjYWMwNDFjZmFlMjgxODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vJNBXM5_i9wgt1cunX51nV9ti8wdqWCPL7ZPZWkHir8` },
    });

    if (res.ok) {

      const data = await res.json();
      const data_serialized = (data.results as MediaItem[])
      .filter(item => item.poster_path !== null)
      .map(item => ({
        poster_path: item.poster_path,
        media_type: 'tv',
        id: item.id
      }));
      setPosterPathsTrendingShows(data_serialized)
    }

  }
  const getTopRatedTVShows = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5ZmVhOTU5YWJmMmNjNDY1ZTAzMDIzY2ZkMGRmMCIsIm5iZiI6MTczMjc4NDMxNS45Mjc4NzI3LCJzdWIiOiI2NzQwOTQ5MTVjYWMwNDFjZmFlMjgxODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vJNBXM5_i9wgt1cunX51nV9ti8wdqWCPL7ZPZWkHir8` },
    });

    if (res.ok) {

      const data = await res.json();
      const data_serialized = (data.results as MediaItem[])
      .filter(item => item.poster_path !== null)
      .map(item => ({
        poster_path: item.poster_path,
        media_type: 'tv',
        id: item.id
      }));

      setPostPathsTopRatedShows(data_serialized)
    }

  }
  const getTopRatedMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5ZmVhOTU5YWJmMmNjNDY1ZTAzMDIzY2ZkMGRmMCIsIm5iZiI6MTczMjc4NDMxNS45Mjc4NzI3LCJzdWIiOiI2NzQwOTQ5MTVjYWMwNDFjZmFlMjgxODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vJNBXM5_i9wgt1cunX51nV9ti8wdqWCPL7ZPZWkHir8` },
    });

    if (res.ok) {

      const data = await res.json();
      const data_serialized = (data.results as MediaItem[])
      .filter(item => item.poster_path !== null)
      .map(item => ({
        poster_path: item.poster_path,
        media_type: 'movie',
        id: item.id
      }));

      setPosterPathsTopRatedMovies(data_serialized)
    }

  }

  return (
    <MovieContext.Provider value={{ 
        details,
        posterPathsTrendingMovies, 
        posterPathsTrendingShows, 
        postPathsTopRatedShows, 
        posterPathsTopRatedMovies, 
        fetchMovieDetail     
    }}>

      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);