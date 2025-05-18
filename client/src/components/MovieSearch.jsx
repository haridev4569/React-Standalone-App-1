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
    <div className='bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto'>
        <form className='flex flex-wrap sm:flex-nowrap items-end gap-4 sm:gap-6' onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-grow min-w-0">
            <label htmlFor="title" className="sr-only">Search by Title</label>
            <input
              type="text"
              id="title"
              placeholder='Search by Title'
              className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 sm:text-sm'
              {...register('title', { required: "Title is required" })}
            />
          </div>

          <div className="w-full sm:w-32 flex-shrink-0">
            <label htmlFor="year" className="sr-only">Search by Year</label>
            <input
              type="number"
              id="year"
              placeholder='Year'
              className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
              {...register('year')}
            />
          </div>

          <div className="w-full sm:w-40 flex-shrink-0">
            <label htmlFor="movie-type" className="sr-only">Movie Type</label>
            <select
              name="movie-type"
              id="movie-type"
              className='block w-full pl-3 pr-10 py-2.5 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm'
              defaultValue=""
              {...register('type')}
            >
              <option value="">All Types</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
          </div>

          <div className="w-full sm:w-auto flex-shrink-0">
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:opacity-75 disabled:cursor-not-allowed'
            >
              {isSubmitting ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieSearch