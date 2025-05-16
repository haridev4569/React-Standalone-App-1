import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { useAuth } from "./context/AuthContext";
import UsersPage from "./pages/UsersPage";
import MoviesPage from "./pages/MoviesPage";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (

    <div>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<Navigate replace to="/" />} />
          <Route path="/signup" element={<Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={
            <LoginPage />
          } />
          <Route path="/signup" element={
            <SignUpPage />
          } />
          <Route path="*" element={
            <LoginPage />
          } />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </div>
  )
}

export default App;
