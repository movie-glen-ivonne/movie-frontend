import Image from "next/image";
import Carousel from '../components/Carousel'
import { mockdata,  trending_movies_mock, trending_tvshows_mock, topRatedMoviesMock, topRatedTvShowsMock} from '../mock-data'

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
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/arcane2.webp')] bg-cover bg-[center_top_30%]">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="relative grid grid-rows-[10px_2fr_100px] items-center p-20 justify-items-center max-h-[120px] font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col row-start-1 items-center my-10 sm:items-start">
              <div className="max-w-2xl">
                <div className="text-center">
                  <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-4xl">
                    My Librarys
                  </h1>
                </div>
              </div>
            </main>
          </div>
        </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Library Name 1</p>
        <Carousel data={posterPathsSearch} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Library Name 2</p>
        <Carousel data={posterPathsTrendingMovies} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Library Name 2</p>
        <Carousel data={posterPathsTrendingShows} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Library Name 4</p>
        <Carousel data={posterPathsTopRatedMovies} />
      </div>
      <div className="mt-2 p-4 font-bold">
        <p className="p-3">Library Name 5</p>
        <Carousel data={postPathsTopRatedShows} />
      </div>
    </>
  );
}
