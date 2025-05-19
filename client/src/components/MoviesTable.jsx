import { useMemo, useState } from 'react';
import { useMovie } from '../context/MovieContext';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { LoadingSpinner } from './LoadingSpinner';

const columnHelper = createColumnHelper();

const MoviesTable = () => {

  const { movies, isLoading } = useMovie();
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  })

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
            <img
              src="/notavailablepic.jpg"
              alt="Not Available"
              style={{ width: '50px', height: '50px' }}
            />
          )
        },
        enableSorting: false,
      }),

      columnHelper.accessor('Title', {
        header: 'Title',
        cell: info => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('Year', {
        header: 'Year',
        cell: info => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('Type', {
        header: 'Type',
        cell: info => info.getValue(),
        enableSorting: true,
      }),
    ]
    , []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <LoadingSpinner />;
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
            <thead className="bg-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      {' '}
                      {{
                        asc: '⬆️',
                        desc: '⬇️',
                      }[header.column.getIsSorted()] ?? null}
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
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <div className='flex items-center gap-3'>
            <span>
              Page{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>

            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 px-2 py-1 border rounded text-sm"
            />
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>

      </div>
    </div>


  );
}

export default MoviesTable