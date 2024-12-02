'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Carousel from './components/Carousel'
import { mockdata,  trending_movies_mock, trending_tvshows_mock, topRatedMoviesMock, topRatedTvShowsMock} from './mock-data'
import Details from './components/Details'
import { useMovie } from './context/MovieContext';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';


interface MediaItem {
  poster_path: string;
  media_type: string;
  id: number;
}

export default function Home() {
  const { isAuthenticated, loading } : any = useAuth();
  const [details, setDetails] = useState<any>(null); // State to hold movie details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [postPathMovies, setPostPathMovies] = useState<MediaItem[] | null>(null);
  const [message, setMessage] = useState('');
  const {
    posterPathsTrendingMovies, 
    posterPathsTrendingShows, 
    postPathsTopRatedShows, 
    posterPathsTopRatedMovies
  } : any = useMovie();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } 
  }, [isAuthenticated, loading, router]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchMovieDetail =  async (id: number, media_type: string) => {
      openModal();

      const res = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5ZmVhOTU5YWJmMmNjNDY1ZTAzMDIzY2ZkMGRmMCIsIm5iZiI6MTczMjc4NDMxNS45Mjc4NzI3LCJzdWIiOiI2NzQwOTQ5MTVjYWMwNDFjZmFlMjgxODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vJNBXM5_i9wgt1cunX51nV9ti8wdqWCPL7ZPZWkHir8` },
      });
      const details = await res.json();
      const video  = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5ZmVhOTU5YWJmMmNjNDY1ZTAzMDIzY2ZkMGRmMCIsIm5iZiI6MTczMjc4NDMxNS45Mjc4NzI3LCJzdWIiOiI2NzQwOTQ5MTVjYWMwNDFjZmFlMjgxODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vJNBXM5_i9wgt1cunX51nV9ti8wdqWCPL7ZPZWkHir8` },
      });

      const video_detail = await video.json();
      
      if (details && video_detail) {
        
        setDetails({
            id: details.id,
            youtube_url: (video_detail.results[0]) ? `https://www.youtube.com/watch?v=${video_detail.results[0].key}` : "",
            poster_path: details.poster_path,
            first_air_date: media_type == 'movie' ? details.release_date : details.first_air_date,
            original_name: media_type == 'movie' ? details.original_title : details.original_name,
            overview: details.overview,
            vote_average: details.vote_average,
            saved: false
        });
    }
  };

  const fetchMoviesAndTvShows = async (query : string) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
          if (query !== "") {
            
            const res = await fetch(`https://movie-project-bk-413936355529.europe-west1.run.app/api/search/?query=${query}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setPostPathMovies(data)
            } else {
              setMessage('No songs saved!')
            }
          } else {
            setMovies(null)
          }
        } catch (err) {
            console.log(err);
            setMessage('Error fetching profile songs')
        } finally {
            // console.log('here2')
        }
    }
};

  const handleInputChange = (e : any) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchMoviesAndTvShows(newQuery);
  };

  return (
    <>
        {details && <Details data={details} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />} 

        <div className="relative h-96 w-full">
          <div className="absolute inset-0 bg-[url('/arcane.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="relative grid grid-rows-[10px_2fr_700px] items-center p-20 justify-items-start max-h-[420px] font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col row-start-2 items-center my-10 sm:items-start">
              <div className="max-w-2xl">
                <div className="text-center">
                  <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-4xl">
                    Search for Movies & TV Shows
                  </h1>
                  <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    <input
                      type="text"
                      value={query} onChange={handleInputChange}
                      placeholder="Search for a movie or TV show"
                      className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>

        {postPathMovies && query !== "" && (

          <div className="mt-2 p-4 font-bold">
            <p className="p-3">Search "{query}"</p>
            <Carousel data={postPathMovies} fetchMovieDetail={fetchMovieDetail}/>
          </div>
        )}

        {posterPathsTrendingMovies && (

          <div className="mt-2 p-4 font-bold">
            <p className="p-3">Trending movies</p>
            <Carousel data={posterPathsTrendingMovies} fetchMovieDetail={fetchMovieDetail}/>
          </div>
        )} 

        {posterPathsTrendingShows && (
          <div className="mt-2 p-4 font-bold">
            <p className="p-3">Trending TV Shows</p>
            <Carousel data={posterPathsTrendingShows} fetchMovieDetail={fetchMovieDetail}/>
          </div>
        )}

        {postPathsTopRatedShows && (
          <div className="mt-2 p-4 font-bold">
            <p className="p-3">Top Rated Tv Shows</p> 
            <Carousel data={postPathsTopRatedShows} fetchMovieDetail={fetchMovieDetail} />
          </div>
        )}

        {posterPathsTopRatedMovies && (
          <div className="mt-2 p-4 font-bold">
            <p className="p-3">Top Rated Movies</p>
            <Carousel data={posterPathsTopRatedMovies} fetchMovieDetail={fetchMovieDetail}/>
          </div>
        )}
    </>
  );
}
