import { useMemo } from 'react';
import { useMovie } from '../context/MovieContext';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const MoviesTable = () => {

  const { movies, isLoading } = useMovie();

  const data = useMemo(() => movies || [], [movies]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('Poster', {
        header: 'Poster',
        cell: info => {
          const posterUrl = info.getValue();
          return posterUrl ? (
            <img src={posterUrl} style={{ width: '50px', height: '50px' }} />
          ) : (
            <span>Poster not available</span>
          )
        }
      }),

      columnHelper.accessor('Title', {
        header: 'Title',
        cell: info => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('Year', {
        header: 'Year',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('Type', {
        header: 'Type',
        cell: info => info.getValue(),
      }),
    ]
    , []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!movies || movies.length === 0) return (
    <div className="mt-8 sm:mt-12 w-full max-w-md mx-auto px-4 sm:px-0 text-center">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Search for Movies
        </h3>
      </div>
    </div>
  );;

  return (

    <div className=" mt-8 sm:mt-12 w-full max-w-5xl mx-auto px-4 sm:px-0">
      <div className="p-5 sm:p-6 rounded-xl shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Here are the movies
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50/70 transition-colors duration-150 ease-in-out">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-700 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default MoviesTable