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
  if (!movies || movies.length === 0) return <p>Search for movies</p>;

  return (
    <div>
      <h2>Here are the movies</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MoviesTable