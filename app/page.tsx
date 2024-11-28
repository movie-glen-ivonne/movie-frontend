import Image from "next/image";
import Carousel from './components/Carousel'
import { mockdata,  trending_movies_mock, trending_tvshows_mock, topRatedMoviesMock, topRatedTvShowsMock} from './mock-data'

export default function Home() {

  const posterPathsSearch = mockdata.results
  .filter(item => item.poster_path !== null) // Optional: filter out items where poster_path is null
  .map(item => ({
    poster_path: item.poster_path
  }));
  const posterPathsTrendingMovies = trending_movies_mock.results
  .filter(item => item.poster_path !== null) // Optional: filter out items where poster_path is null
  .map(item => ({
    poster_path: item.poster_path
  }));
  const posterPathsTrendingShows = trending_tvshows_mock.results
  .filter(item => item.poster_path !== null) // Optional: filter out items where poster_path is null
  .map(item => ({
    poster_path: item.poster_path
  }));
  const posterPathsTopRatedMovies = topRatedMoviesMock.results
  .filter(item => item.poster_path !== null) // Optional: filter out items where poster_path is null
  .map(item => ({
    poster_path: item.poster_path
  }));
  const postPathsTopRatedShows = topRatedTvShowsMock.results
  .filter(item => item.poster_path !== null) // Optional: filter out items where poster_path is null
  .map(item => ({
    poster_path: item.poster_path
  }));

  return (
    <>
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
                      value=""
                      placeholder="Search for a movie or TV show"
                      className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Search "Dexter"</p>
        <Carousel data={posterPathsSearch} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Trending movies</p>
        <Carousel data={posterPathsTrendingMovies} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Trending TV Shows</p>
        <Carousel data={posterPathsTrendingShows} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Top Rated Movies</p>
        <Carousel data={posterPathsTopRatedMovies} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Top Rated TV Shows</p>
        <Carousel data={postPathsTopRatedShows} />
      </div>
    </>
  );
}
