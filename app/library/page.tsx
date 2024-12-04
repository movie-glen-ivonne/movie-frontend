'use client';

import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel'
import Details from '../components/Details'
import CreateLibrary from '../components/CreateLibrary'
import Toast from '../components/Toast'
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Library, MediaItem, Movie } from '../types/Library';

export default function Home() {
    const [details, setDetails] = useState<any>(null); // State to hold movie details
    const { isAuthenticated, loading } : any = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateLibraryModalOpen, setIsCreateLibraryModalOpen] = useState(false);
    const {
        userLibraries
      } : any = useMovie();
      
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openCreateLibraryModal = () => setIsCreateLibraryModalOpen(true);
    const closeCreateLibraryModal = () => setIsCreateLibraryModalOpen(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);
    const [selectedLibraryId, setSelectedLibrarId] = useState<number | null>(null);
    const [selectedLibraryName, setSelectedLibraryName] = useState<string | null>(null);
    const [moviesData, setMoviesData] = useState<MediaItem[]>([]);
    const [recommendations, setRecommendations] = useState<MediaItem[]>([]);

    const handleShowToast = (message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
    };


    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      } 
    }, [isAuthenticated, loading, router]);

    
    const fetchMovieDetail =  async (id: number, media_type: string) => {
        openModal();
        
        const token = localStorage.getItem('token');
        if (token) {
            const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/movies/${id}?type=${media_type}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {

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
        }
    };

    const fetchRecommendationsOpenAI = async (library_id: number) => {

        const token = localStorage.getItem('token');
        if (token) {
            const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/recommendations/${library_id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {

                const details = await res.json();
                setRecommendations(details);
            }
        }
    }

    const handleLibraryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        const selectedLibrary = userLibraries.find((library: Library) => library.id === selectedId);
        if (selectedLibrary) {

            const data = selectedLibrary.movies.map(({ movie }: { movie: Movie }) => ({
                poster_path: movie.poster_path,
                id: movie.externalId,
                media_type: movie.media_type
            }));

            setMoviesData(data);
              
            setSelectedLibrarId(selectedLibrary.id);
            setSelectedLibraryName(selectedLibrary.name);
            setRecommendations([])

            if (data.length !== 0) {

                fetchRecommendationsOpenAI(selectedLibrary.id);
            }
        }
      };

      const handleRemoveFromSwiper = (id: number) => {
        setMoviesData((prevData) => prevData.filter((item) => item.id !== id));
      };

      const handleAddToSwiper = (movie: MediaItem) => {
        setMoviesData((prevData) => [...prevData, movie]);
      };
      

    return (
        <>  
            {showToast && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast 
                        message={toastMessage} 
                        onClose={() => setShowToast(false)} 
                        type={toastType}
                    />
                </div>
            )}
            {details && <Details data={details} library_id={selectedLibraryId} library_name={selectedLibraryName} isModalOpen={isModalOpen} closeModal={closeModal} removeFromSwiper={handleRemoveFromSwiper} addToSwiper={handleAddToSwiper}/>}
            <CreateLibrary isCreateLibraryModalOpen={isCreateLibraryModalOpen} closeCreateLibraryModal={closeCreateLibraryModal} showToast={handleShowToast}/>
            <div className="relative">
            <div className="absolute inset-0 bg-[url('/arcane2.webp')] bg-cover bg-[center_top_30%]">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative grid grid-rows-[10px_2fr_100px] items-center p-20 justify-items-center max-h-[120px] font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col row-start-1 items-center my-10 sm:items-start">
                <div className="max-w-2xl">
                    <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-4xl">
                        My Libraries
                    </h1>
                    </div>
                </div>
                </main>
            </div>
            </div>
        
        <div className="flex justify-center gap-6 items-center pt-7 px-4">


            <div>
                <select
                   
                onChange={handleLibraryChange}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option defaultValue="">Choose a library</option>
                
                {userLibraries.map((library: Library) => (
                    <option key={library.id} value={library.id} >
                        {library.name}
                    </option>
                ))}
                </select>
            </div>

            <button
                style={{ backgroundColor: '#e50914' }}
                className="flex justify-center rounded-md px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={openCreateLibraryModal}
            >
                Create Library
            </button>
        </div>
        {selectedLibraryId && selectedLibraryName && (

            <div className="p-4 font-bold">
                <p className="p-3">{selectedLibraryName}</p>
                <Carousel data={moviesData} fetchMovieDetail={fetchMovieDetail} />
            </div>
        )}
        
        {recommendations.length !== 0 && (
            <div className="p-4 font-bold">

                <p className="p-3">Recommendations</p>
                <Carousel data={recommendations} fetchMovieDetail={fetchMovieDetail} />
            </div>
        )}
         {recommendations.length == 0 && selectedLibraryId && selectedLibraryName && moviesData.length !== 0 && (
        
            <div className='mb-12'>
                <div className="p-4 font-bold">

                    <p className="p-3">Recommendations</p>
                </div>
                <div className="flex items-center justify-center mt-12">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-netflixRed border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                </div>
                    <span className="p-4 text-lg">
                        Getting recommendations<span className="animate-blink text-netflixRed">...</span>
                    </span>
                </div>
            </div>
         )}
        
        </>
    );
}
