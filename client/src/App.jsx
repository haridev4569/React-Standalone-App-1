import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { useAuth } from "./context/AuthContext";
import { SignUpFormProvider } from "./context/SignUpFormContext";
import { LoginFormProvider } from "./context/LoginFormContext";
import UsersPage from "./pages/UsersPage";
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
          <Route path="/" element={<UsersPage />} />
          <Route path="/login" element={<Navigate replace to="/" />} />
          <Route path="/signup" element={<Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={
            <LoginFormProvider>
              <LoginPage />
            </LoginFormProvider>
          } />
          <Route path="/signup" element={
            <SignUpFormProvider>
              <SignUpPage />
            </SignUpFormProvider>
          } />
          <Route path="*" element={
            <LoginFormProvider>
              <LoginPage />
            </LoginFormProvider>
          } />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </div>
  )
}

export default App;
