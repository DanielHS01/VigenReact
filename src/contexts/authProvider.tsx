import React, { useState, useEffect, useMemo, useCallback } from "react";
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
    if (userData) {
      Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
    } else {
      Cookies.remove("userData");
    }
  }, [userData]);

  // ✅ Usamos useCallback para evitar que login y logout se recreen en cada render
  const login = useCallback(
    (data: UserData) => {
      setUserData(data);
      console.log(data);

      if (data.type === "User") {
        console.log("Usuario tipo User");
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
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUserData(null);
    Cookies.remove("userData");
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = !!userData;

  // ✅ Ahora incluimos login y logout en useMemo para evitar el error de ESLint
  const authContextValue = useMemo(
    () => ({
      userData,
      login,
      logout,
      isAuthenticated,
    }),
    [userData, isAuthenticated, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
