'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Carousel from '../components/Carousel'
import { mockdata,  trending_movies_mock, trending_tvshows_mock, topRatedMoviesMock, topRatedTvShowsMock} from '../mock-data'
import Details from '../components/Details'
import CreateLibrary from '../components/CreateLibrary'
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [details, setDetails] = useState<any>(null); // State to hold movie details
    const { isAuthenticated, loading } : any = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateLibraryModalOpen, setIsCreateLibraryModalOpen] = useState(false);
    const {
        posterPathsTrendingMovies, 
        posterPathsTrendingShows, 
        postPathsTopRatedShows, 
        posterPathsTopRatedMovies
      } : any = useMovie();
      
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openCreateLibraryModal = () => setIsCreateLibraryModalOpen(true);
    const closeCreateLibraryModal = () => setIsCreateLibraryModalOpen(false);


    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      } 
    }, [isAuthenticated, loading, router]);

    
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
                youtube_url: `https://www.youtube.com/watch?v=${video_detail.results[0].key}`,
                poster_path: details.poster_path,
                first_air_date: media_type == 'movie' ? details.release_date : details.first_air_date,
                original_name: media_type == 'movie' ? details.original_title : details.original_name,
                overview: details.overview,
                vote_average: details.vote_average,
                saved: false
            });
        }
    };
    
    const posterPathsSearch = mockdata.results
    .filter(item => item.poster_path !== null) // Optional: filter out items where poster_path is null
    .map(item => ({
        poster_path: item.poster_path,
        id: item.id,
        media_type: "tv"
    }));


    return (
        <>  

            {details && <Details data={details} library_id={1} library_name='test' isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />}
            <CreateLibrary isCreateLibraryModalOpen={isCreateLibraryModalOpen} openCreateLibraryModal={openCreateLibraryModal} closeCreateLibraryModal={closeCreateLibraryModal} />
            <div className="relative">
            <div className="absolute inset-0 bg-[url('/arcane2.webp')] bg-cover bg-[center_top_30%]">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative grid grid-rows-[10px_2fr_100px] items-center p-20 justify-items-center max-h-[120px] font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col row-start-1 items-center my-10 sm:items-start">
                <div className="max-w-2xl">
                    <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-4xl">
                        My Library
                    </h1>
                    </div>
                </div>
                </main>
            </div>
            </div>

        <div className='flex justify-end pt-5 px-4'>
            <button
                style={{ backgroundColor: '#e50914' }}
                className="flex justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={openCreateLibraryModal}
            >
                Create Library
            </button>
        </div>
        <div className="p-4 font-bold">
            <p className="p-3">Library Name 1</p>
            <Carousel data={posterPathsSearch} fetchMovieDetail={fetchMovieDetail} />
        </div>
        
        {posterPathsTrendingMovies && (
            
            <div className="mt-2 p-4 font-bold"> 
                <p className="p-3">Library Name 2</p>
                <Carousel data={posterPathsTrendingMovies} fetchMovieDetail={fetchMovieDetail}/>
            </div>
        )}
        {posterPathsTrendingShows && (

            <div className="mt-2 p-4 font-bold">
                <p className="p-3">Library Name 3</p>
                <Carousel data={posterPathsTrendingShows} fetchMovieDetail={fetchMovieDetail} />
            </div>
        )}
        {posterPathsTopRatedMovies && (

            <div className="mt-2 p-4 font-bold">
                <p className="p-3">Library Name 4</p>
                <Carousel data={posterPathsTopRatedMovies} fetchMovieDetail={fetchMovieDetail} />
            </div>
        )}
        {postPathsTopRatedShows && (

            <div className="mt-2 p-4 font-bold">
                <p className="p-3">Library Name 5</p>
                <Carousel data={postPathsTopRatedShows} fetchMovieDetail={fetchMovieDetail}/>
            </div>
        )}
        </>
    );
}
