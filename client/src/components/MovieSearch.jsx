import React from 'react';
import { useForm } from 'react-hook-form';
import { useMovie } from '../context/MovieContext';

const MovieSearch = () => {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { fetchMovies } = useMovie();

  const onSubmit = (data) => {
    fetchMovies(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" placeholder='Search by Title' {...register('title', { required: "Title is required" })} />
      </div>
      <div>
        <input type="number" placeholder='Search by Year' {...register('year')} />
      </div>
      <div>
        <select name="movie-type" id="movie-type" {...register('type')}>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
          <option value="">All</option>
        </select>
      </div>

      <button type='submit' disabled={isSubmitting}>{isSubmitting ? "Searching..." : "Search"}</button>
    </form>
  )
}

export default MovieSearch