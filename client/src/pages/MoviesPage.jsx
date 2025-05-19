import MovieSearch from "../components/MovieSearch";
import MoviesTable from "../components/MoviesTable";
import { MovieProvider } from "../context/MovieContext";

const MoviesPage = () => {
  return (
    <MovieProvider>
      <div className="bg-blue-50 min-h-screen h-full">
        <MovieSearch />
        <MoviesTable />
      </div>
    </MovieProvider>
  )
}

export default MoviesPage