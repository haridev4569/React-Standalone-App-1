import MovieSearch from "../components/MovieSearch";
import MoviesTable from "../components/MoviesTable";
import { MovieProvider } from "../context/MovieContext";

const MoviesPage = () => {
  return (
    <MovieProvider>
      <MovieSearch />
      <MoviesTable />
    </MovieProvider>
  )
}

export default MoviesPage