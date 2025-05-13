import { useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";

function App() {

  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <UsersPage /> : <AuthPage />;
}

export default App;
