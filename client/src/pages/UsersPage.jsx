import React from 'react'
import { useAuth } from '../context/AuthContext';
import UsersTable from '../components/UsersTable';
const UsersPage = () => {
    const { currentUser, logout } = useAuth();
  return (
    <div>
        <h1>Users</h1>
        {currentUser && <p>Current user: {currentUser.username}</p>}
        <button onClick={logout}>Logout</button>
        <hr />
        <UsersTable />
    </div>
  )
};

export default UsersPage
