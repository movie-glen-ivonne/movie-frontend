'use client';

import { useState, useEffect } from 'react';
import Carousel from './components/Carousel'
import Details from './components/Details'
import { useMovie } from './context/MovieContext';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { MediaItem } from './types/Library';


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
    posterPathsTopRatedMovies,
  } : any = useMovie();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } 
  }, [isAuthenticated, loading, router]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {

    setDetails(null);
    setIsModalOpen(false);
  }

    const fetchMovieDetail =  async (id: number, media_type: string) => {
        openModal();
        
        const token = localStorage.getItem('token');
        if (token) {
            const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/movies/${id}?type=${media_type}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            });
            const details = await res.json();
            
            if (details) {
            
                setDetails({
                    id: details.id,
                    video_url: (details.video_url) ? details.video_url : "",
                    poster_path: details.poster_path,
                    first_air_date: details.first_air_date,
                    original_name: details.original_name,
                    overview: details.overview,
                    vote_average: details.vote_average,
                    media_type: details.media_type,
                    saved: details.saved
                });
            }
        }
    };

  const fetchMoviesAndTvShows = async (query : string) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
          if (query !== "") {
            
            const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/search/?query=${query}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setPostPathMovies(data)
            } else {
              setMessage('No songs saved!')
              console.log(message);
            }
          } else {
            setMovies(null)
            console.log(movies);
          }
        } catch (err) {
            console.log(err);
            setMessage('Error fetching profile songs')
        } finally {
            // console.log('here2')
        }
    }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);  // Update query state as user types
  };

  const handleSearch = () => {
    fetchMoviesAndTvShows(query); // Use the query state value directly
  };
  

  return (
    <>
        {details && <Details data={details} isModalOpen={isModalOpen} closeModal={closeModal} removeFromSwiper={() => {}} addToSwiper={() => {}} />} 

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
                  {/* <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8"> */}
                    {/* <input
                      type="text"
                      value={query} onChange={handleInputChange}
                      placeholder="Search for a movie or TV show"
                      className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    /> */}
                    <div className="relative mt-8 flex h-10 w-full min-w-[200px] max-w-[24rem]">
                      <button
                        className="!absolute right-1 top-1 z-10 select-none rounded bg-netflixRed py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                        type="button"
                        onClick={handleSearch}
                        data-ripple-light="true"
                      >
                        Search
                      </button>
                      <input
                        onChange={handleInputChange}
                        type="email"
                        className="peer h-full w-full rounded-[7px] border border-blue-white-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        required
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Search a Movie or TV Show
                      </label>
                    </div>
                  {/* </p> */}
                </div>
              </div>
            </main>
          </div>
        </div>

        {postPathMovies && query !== "" && (

          <div className="mt-2 p-4 font-bold">
            <p className="p-3">{`Search "${query}"`}</p>
            {postPathMovies.length == 0 && (
              <p className='p-4'>No movies or shows were found.</p>
            )}
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
