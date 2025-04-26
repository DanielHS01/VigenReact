import { useState } from "react";
import UserForm from "@/auth/components/Signups/UserForm";
import UsersMap from "@/auth/components/Maps/UsersMap";

const UserSignup = () => {
  // Estado para la ubicación (levantado aquí)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Función para actualizar la ubicación desde el mapa
  const handleLocationSelect = (loc: { lat: number; lng: number }) => {
    setLocation(loc);
  };

  return (
    <div className="p-16 flex flex-col w-full justify-center space-y-10 md:space-y-0 items-center md:flex-row md:justify-center md:items-start md:gap-32">
      {/* Pasar la ubicación seleccionada y el manejador de ubicación al formulario */}
      <UserForm location={location} />
      
      {/* Pasar la función para seleccionar la ubicación al mapa */}
      <div className="w-full md:w-96 h-64 md:h-96">
  <UsersMap onLocationSelect={handleLocationSelect} />
</div>
    </div>
  );
};

export default UserSignup;
