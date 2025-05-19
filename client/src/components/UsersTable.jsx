import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const UsersTable = () => {
  const { users } = useAuth();

  const usersData = useMemo(() => users, [users]);

  if (!usersData || usersData.length === 0) {
    return <p>No users registered yet.</p>;
  }

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('fullname', {
      header: 'Fullname',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('username', {
      header: 'Username',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => <img src={info.getValue()} style={{ width: '50px', height: '50px' }} />,
    }),
  ], []);

  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" mt-8 sm:mt-12 w-full max-w-5xl mx-auto px-4 sm:px-0">
      <h2 className='text-xl font-bold text-gray-800'>Registered Users</h2>
      <div className='bg-white p-6 sm:p-8 rounded-xl shadow-lg'>
        <table className='min-w-full divide-y divide-gray-300 border border-gray-200'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='bg-gray-200'>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}
                    className="px-4 py-3 sm:px-6 sm:py-3.5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider cursor-pointer select-none"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='hover:bg-gray-50'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-800 align-middle" >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;