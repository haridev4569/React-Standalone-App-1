import { useMemo } from 'react';
import { useMovie } from '../context/MovieContext';

const MoviesTable = () => {

  const { movies, isLoading } = useMovie();

  const tableData = useMemo(() => {
    return movies.map((movie) => (
      <tr key={movie.imdbID}>
        <td>{movie.Title}</td>
        <td>{movie.Year}</td>
        <td>{movie.Type}</td>
        <td><img src={movie.Poster} alt={movie.Title} style={{ width: '50px', height: '50px' }} /></td>
      </tr>
    ))
  }, [movies]);

  if (isLoading) return <div>Loading...</div>;
  if (!movies || movies.length === 0) return <p>Search for movies</p>;

  return (
    <div>
      <h2>Here are the movies</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Type</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  )
}

export default MoviesTable