export interface Movie {
    id: number;
    original_name: string;
    externalId: number;
    first_air_date: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    video_url: string;
    media_type: string;
}

export interface Library {
    id: number;
    name: string;
    movies: { movie: Movie }[];
}

export interface MediaItem {
    poster_path: string;
    media_type: string;
    id: number;
}