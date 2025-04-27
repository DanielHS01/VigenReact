import React from "react";
import { useAuth } from "@/contexts/authContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedType?: "User" | "Organization"; // <- Aceptamos un tipo permitido opcional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedType,
}) => {
  const { userData, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userData && userData.type === "User" && !userData.verification) {
    return <Navigate to="/Verification" />;
  }

  // 👇 Aquí controlamos que solo pueda entrar si su tipo coincide
  if (allowedType && userData?.type !== allowedType) {
    // Opcional: redirige a su home correcto
    const redirectPath =
      userData?.type === "Organization" ? "/HomeOrganization" : "/HomeUser";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
