import React from "react";
import { useAuth } from "@/contexts/authContext"; // Asegúrate de importar el contexto de autenticación
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userData, isAuthenticated } = useAuth(); // Obtén el estado de autenticación desde el contexto

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" />;
  }

  if (userData && userData.type === "User" && !userData.verification) {
    // Redirige a verificación si el usuario aún no ha sido verificado
    return <Navigate to="/Verification" />;
  }

  // Si está autenticado, renderiza el componente hijo (la ruta protegida)
  return children;
};

export default ProtectedRoute;
