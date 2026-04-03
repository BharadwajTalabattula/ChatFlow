import { useAuth } from "../../features/auth/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return children;
}