import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext, UserData } from "@/contexts/authContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const savedData = Cookies.get("userData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Si userData cambia, actualiza las cookies
    if (userData) {
      Cookies.set("userData", JSON.stringify(userData), { expires: 7 }); // La cookie expira en 7 días
    } else {
      Cookies.remove("userData");
    }
  }, [userData]);

  const login = (data: UserData) => {
    setUserData(data);
    console.log(data);

    // Verifica el tipo de usuario
    if (data.type === "User") {
      console.log("Usuario tipo User");

      // Verifica la verificación del usuario
      if (data.verification === false) {
        navigate("/Verification");
      } else {
        navigate("/HomeUser");
      }
    } else if (data.type === "Organization") {
      console.log("Usuario tipo Organization");
      navigate("/HomeOrganization");
    } else {
      console.error("Tipo de usuario no reconocido:", data.type);
    }
  };

  const logout = () => {
    setUserData(null);
    Cookies.remove("userData");
    navigate("/login");
  };

  const isAuthenticated = !!userData;

  return (
    <AuthContext.Provider value={{ userData, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
