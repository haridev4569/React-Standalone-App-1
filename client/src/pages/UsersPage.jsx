import React from 'react'
import { useAuth } from '../context/AuthContext';
import UsersTable from '../components/UsersTable';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  return (
    <div className='w-full min-h-screen h-full bg-blue-50 flex '>
      <div className="w-full min-h-screen h-full max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          {/* <h1 className="text-2xl font-bold text-gray-800">Users</h1> */}
          <button onClick={() => navigate('/')} className='bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 rounded outline-none text-md font-medium py-2 px-4 rounded'>Movies Page</button>
          {currentUser && (
            <p className="text-md text-gray-600">
              Current User : <span className="font-medium text-gray-800">{currentUser.username}</span>
            </p>
          )}
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <hr className="border-gray-300 mb-6" />

        <UsersTable />
      </div>
    </div>
  )
};

export default UsersPage
