import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileLines,
  FaCircleUser,
  FaGear,
  FaArrowRightFromBracket,
  FaChartSimple, // Nuevo icono para organización
  FaAddressBook,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie"; // Importar la librería de cookies
import { IoAlertCircle } from "react-icons/io5";
import {
  downloadUserReport,
  downloadNotifyReport,
} from "@/organization/services/reportsService";
import Button from "@/shared/ui/Button";

const UserMenu = ({
  userInitial,
  handleLogout,
}: {
  userInitial: string;
  handleLogout: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null); // Referencia para el menú
  const { t } = useTranslation();

  const [userType, setUserType] = useState<string>(""); // Estado para el tipo de usuario

  useEffect(() => {
    // Obtener los datos del usuario desde las cookies
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const parsedUserData = JSON.parse(userDataCookie);
      setUserType(parsedUserData.type); // Establecer el tipo de usuario ("User" o "Organization")
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para cerrar el menú cuando se hace clic fuera
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  // useEffect para agregar el evento de clic cuando el menú esté abierto
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Renderizar el menú según el tipo de usuario
  const renderMenuOptions = () => {
    if (userType === "User") {
      return (
        <>
          <button
            onClick={() => navigate("/HomeUser")}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaCircleUser />
            <p>{t("UserMenu.Profile")}</p>
          </button>
          <button
            onClick={() => navigate("/Poll")}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaFileLines />
            <p>{t("UserMenu.Poll")}</p>
          </button>
          <button
            onClick={() => navigate("/EditUserInfo")}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaGear />
            <p>{t("UserMenu.Settings")}</p>
          </button>
        </>
      );
    } else if (userType === "Organization") {
      return (
        <>
          <button
            onClick={() => navigate("/HomeOrganization")}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <IoAlertCircle size={18} />
            <p>{t("UserMenu.Alerts")}</p>
          </button>
          <button
            onClick={() => navigate("/Statistics")}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaChartSimple />
            <p>{t("UserMenu.Statistics")}</p>
          </button>
          <button
            onClick={() => setReportModalOpen(true)} // <-- abrir modal
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaAddressBook />
            <p>{t("UserMenu.Reports")}</p>
          </button>
          <button
            onClick={() => navigate("/EditOrganizationInfo")}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaGear />
            <p>{t("UserMenu.Settings")}</p>
          </button>
        </>
      );
    }
    return null; // En caso de que no haya un tipo definido
  };

  return (
    <div className="relative justify-self-center col-span-2" ref={menuRef}>
      {/* Círculo con la inicial del usuario */}
      <button
        onClick={toggleMenu}
        className="cursor-pointer h-10 w-10 bg-cyan-950 hover:bg-cyan-600 text-white dark:bg-cyan-50 dark:text-cyan-950 dark:hover:bg-cyan-100 rounded-full flex justify-center items-center transition-colors"
      >
        {userInitial}
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="md:absolute md:right-0 mt-2 w-48 bg-cyan-950 rounded-lg animate-fade-down shadow-lg py-2 z-10 text-white dark:bg-cyan-50 dark:text-cyan-950">
          {renderMenuOptions()}
          <button
            onClick={handleLogout}
            className="w-full space-x-2 px-4 py-2 hover:bg-cyan-600 flex items-center dark:hover:bg-cyan-100 transition-colors"
          >
            <FaArrowRightFromBracket />
            <p>{t("UserMenu.Logout")}</p>
          </button>
        </div>
      )}

      {reportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 dark:bg-cyan-950 dark:text-white">
            <h2 className="text-xl mb-4 font-bold">Selecciona un reporte</h2>
            <div className="flex flex-col space-y-4">
              <Button
                variant="primary"
                onClick={async () => {
                  await downloadUserReport(); // Llamar servicio
                  setReportModalOpen(false); // Cerrar modal después
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded"
              >
                Reporte de Usuarios
              </Button>
              <Button
                variant="primary"
                onClick={async () => {
                  await downloadNotifyReport(); // Llamar servicio
                  setReportModalOpen(false); // Cerrar modal después
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded"
              >
                Reporte de Alertas
              </Button>
            </div>
            <button
              onClick={() => setReportModalOpen(false)}
              className="mt-6 text-cyan-600 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
