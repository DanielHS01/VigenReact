import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserForm from "@/auth/components/Signups/UserForm";
import UsersMap from "@/auth/components/Maps/UsersMap";
import { FaTimes } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

const UserSignup = () => {
  const { t } = useTranslation();

  // Estado para la ubicación (levantado aquí)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Función para actualizar la ubicación desde el mapa
  const handleLocationSelect = (loc: { lat: number; lng: number }) => {
    setLocation(loc);
  };

  // Estado para el toggle de la información de ubicación
  const [isLocationInfoOpen, setIsLocationInfoOpen] = useState(false);

  return (
    <div className="p-16 flex flex-col w-full justify-center space-y-10 md:space-y-0 items-center md:flex-row md:justify-center md:items-start md:gap-32">
      {/* Pasar la ubicación seleccionada y el manejador de ubicación al formulario */}
      <UserForm location={location} />
      
      {/* Column for map and info toggle */}
      <div className="flex flex-col items-center">
        <div className="w-full md:w-96 h-64 md:h-96 flex-none">
          <UsersMap onLocationSelect={handleLocationSelect} />
        </div>
        {/* Location Info Toggle (below the map in the same column) */}
        <div className="mt-4">
          {isLocationInfoOpen ? (
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-96 md:w-80 min-h-40">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">{t("Register.info")}</h3>
                <button
                  onClick={() => setIsLocationInfoOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <p className="text-xs">{t("Register.description")}</p>
            </div>
          ) : (
            <button
              onClick={() => setIsLocationInfoOpen(true)}
              className="flex items-center text-cyan-950 hover:text-cyan-800"
            >
              <IoInformationCircleOutline className="mr-2" size={20} />
              <span className="text-xs">{t("Register.info")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSignup;