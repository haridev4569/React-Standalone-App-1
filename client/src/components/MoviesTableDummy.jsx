import React, { useMemo, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const MoviesTableInternal = () => {
  const { movies, isLoading, error } = useContext(MovieContext);

  const columns = useMemo(
    () => [
      columnHelper.accessor('Poster', {
        header: 'Poster',
        cell: info => {
          const posterUrl = info.getValue();
          const movieTitle = info.row.original.Title;
          return posterUrl && posterUrl !== "N/A" ? (
            <img
              src={posterUrl}
              alt={movieTitle}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/50x75/cccccc/969696?text=No+Image';
              }}
            />
          ) : (
            <span>No Poster</span>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor('Title', {
        header: 'Title',
        cell: info => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('Year', {
        header: 'Year',
        cell: info => info.getValue(),
        // enableSorting is true by default for this column as getSortedRowModel is used
        // and no specific sortingFn is needed for basic string/number sorting.
      }),
      columnHelper.accessor('Type', {
        header: 'Type',
        cell: info => {
          const type = info.getValue();
          if (typeof type === 'string' && type.length > 0) {
            return type.charAt(0).toUpperCase() + type.slice(1);
          }
          return type;
        },
        enableSorting: false,
      }),
      columnHelper.accessor('imdbID', {
        header: 'IMDb ID',
        cell: info => (
          <a
            href={`https://www.imdb.com/title/${info.getValue()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {info.getValue()}
          </a>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

  const data = useMemo(() => movies || [], [movies]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length && !isLoading) {
    return <div>No movies found or search not yet performed.</div>;
  }

  return (
    <div>
      <h2>Movie Results</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && {
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] }
                    </div>
                  )}
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
  );
};

export const MoviesTable = React.memo(MoviesTableInternal);

// If you prefer a default export for MoviesTable:
// export default React.memo(MoviesTableInternal);