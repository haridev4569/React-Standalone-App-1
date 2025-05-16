import { useState, useEffect, useContext, createContext, useCallback } from 'react';

const MovieContext = createContext();

export const useMovie = () => {
    return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {

    const apiUrl = "https://www.omdbapi.com/?apikey=f9a78be1";

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    const fetchMovies = useCallback(async (data) => {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}&s=${data.title.trim().toLowerCase()}&y=${data.year}&type=${data.type}`);
        const result = await response.json();
        setMovies(result.Search || []);
        setIsLoading(false);
    }, []);
    
    const contextValue = {
        movies,
        isLoading,
        fetchMovies,
    };

    return (
        <MovieContext.Provider value={contextValue}>
            {children}
        </MovieContext.Provider>
    );
}