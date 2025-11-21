import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Loader, Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin size-4" />
      </div>
    );

  if (!user) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return children;
};

export default ProtectedRoute;
