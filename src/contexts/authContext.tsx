import { createContext, useContext } from "react";

// Define la interfaz para los datos del usuario
export interface UserData {
  token: string;
  name: string;
  gender?: string;
  email?: string;
  identification?: string;
  birthdate?: string;
  country_code?: string;
  phone?: string;
  occupation?: string;
  postal_code?: string;
  marital_status?: string;
  ubication?: string;
  code?: string;
  type: "User" | "Organization";
  nit?: string;
  tel?: string;
  verification?: boolean;
  password?: string;
  organizationTypeId?: number;
}

// Define la interfaz para el contexto de autenticación
export interface AuthContextProps {
  userData: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Crea el contexto de autenticación
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
