import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
    children: React.ReactNode;
  }
  
  export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
    const { userLogger } = useAuth();
  
    const hasPermission = userLogger();
  
    if (!hasPermission) {
      return <Navigate to="/login" replace />;
    }
  
    return <>{children}</>;
  };