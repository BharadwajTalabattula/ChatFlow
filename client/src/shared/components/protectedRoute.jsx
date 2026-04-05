import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import LoadingPage from "./LoadingPage";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <LoadingPage />;
  if (!token) return <Navigate to="/login" />;

  return children;
}