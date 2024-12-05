'use client';

import { useState, useEffect } from 'react';
import Carousel from '../../components/CarouselViewOnly';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Library, MediaItem, Movie } from '../../types/Library';
import { useParams } from 'next/navigation';

// interface Props {
//     params: {
//         id: string;
//     };
// }

const SharedLibrary = () => {
    const { isAuthenticated, loading }: any = useAuth();
    const router = useRouter();

    const [selectedLibraryId, setSelectedLibraryId] = useState<number | null>(null);
    const [selectedLibraryName, setSelectedLibraryName] = useState<string | null>(null);
    const [moviesData, setMoviesData] = useState<MediaItem[]>([]);
    const [loadingLibraries, setLoadingLibraries] = useState(true);
    const params = useParams<{ id: string; }>()
    console.log("id->",params.id)

    const getSharedLibraryData = async () => {
        try {
            setLoadingLibraries(true);
            const token = localStorage.getItem('token');
            const { id } = params;

            if (token) {
                const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/libraries/${id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    if (res.status === 204) {
                        console.log('No content available.');
                        return;
                    }   
 
                    const data: Library = await res.json();

                    const movieData = data.movies.map(({ movie }: { movie: Movie }) => ({
                        poster_path: movie.poster_path,
                        id: movie.externalId,
                        media_type: movie.media_type
                    }));
                    setMoviesData(movieData);
                    setSelectedLibraryId(data.id);
                    setSelectedLibraryName(data.name);
                } else {
                    console.error('Failed to fetch library data.');
                }
                setLoadingLibraries(false);
            } else {
                console.error('No token found.');
                setLoadingLibraries(false);
            }
        } catch (err) {
            console.error('Error fetching library data:', err);
            setLoadingLibraries(false);
        }
    };

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        } else if (isAuthenticated) {
            getSharedLibraryData();
        }
    }, [isAuthenticated, loading, router]);

    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 bg-[url('/arcane2.webp')] bg-cover bg-[center_top_30%]">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="relative grid grid-rows-[10px_2fr_100px] items-center p-20 justify-items-center max-h-[120px] font-[family-name:var(--font-geist-sans)]">
                    <main className="flex flex-col row-start-1 items-center my-10 sm:items-start">
                        <div className="max-w-2xl">
                            <div className="text-center">
                                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-4xl">
                                    {selectedLibraryName}
                                </h1>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {moviesData.length > 0 && selectedLibraryId && selectedLibraryName && (
                <div className="p-4 font-bold">
                    <p className="p-3">{selectedLibraryName}</p>
                    <Carousel data={moviesData} />
                </div>
            )}
            {moviesData.length == 0 && loading && (
                <div className='mb-12'>
                    <div className="p-4 font-bold">

                        <p className="p-3">{selectedLibraryName}</p>
                    </div>
                    <div className="flex items-center justify-center mt-12">
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-netflixRed border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                        </div>
                        <span className="p-4 text-lg">
                            Getting Movies<span className="animate-blink text-netflixRed">...</span>
                        </span>
                    </div>
                </div>
                )}
        </>
    );
};

export default SharedLibrary;