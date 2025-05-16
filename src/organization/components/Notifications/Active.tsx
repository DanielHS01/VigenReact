import { useEffect, useState } from "react";
import Table from "@/shared/ui/Table";
import { useTranslation } from "react-i18next";
import {
  fetchAlerts,
  fetchOrganizationType,
  updateAlertState,
  Alert,
  deleteAlert,
} from "@/organization/services/notifyService";
import { IoCheckbox, IoTrashBinSharp, IoSearchSharp } from "react-icons/io5";
import { getUserById } from "@/auth/services/authServices";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface User {
  identification: string;
  name: string;
  email: string;
  ubication: string;
  phone: string;
}

interface AlertWithOrgName extends Alert {
  organizationName: string;
}

const Active = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<AlertWithOrgName[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    const getAlertsWithOrgNames = async () => {
      try {
        const alertsData = await fetchAlerts();
        const alertsWithOrgNames = await Promise.all(
          alertsData
            .filter((alert) => alert.stateId === 0) // Filtra las alertas con stateId igual a 0
            .map(async (alert) => {
              const organization = await fetchOrganizationType(
                alert.organizationTypeId
              );
              return { ...alert, organizationName: organization.name };
            })
        );
        setAlerts(alertsWithOrgNames);
      } catch (error) {
        setError("Error al cargar las alertas y sus tipos de organización");
      }
    };

    getAlertsWithOrgNames();
  }, []);

  // Manejador para actualizar el stateId
  const handleCheckboxClick = async (alert: AlertWithOrgName) => {
    if (!alert.id) {
      console.error("Alert ID is undefined:", alert);
      return;
    }

    try {
      // Solo cambiamos el stateId en el objeto de alerta
      const updatedAlert: AlertWithOrgName = { ...alert, stateId: 1 };
      await updateAlertState(updatedAlert);

      // Actualiza el estado local para reflejar el cambio
      setAlerts((prevAlerts) =>
        prevAlerts.map((a) => (a.id === alert.id ? { ...a, stateId: 1 } : a))
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const handleDeleteClick = async (alertId: number) => {
    try {
      await deleteAlert(alertId);
      // Actualiza el estado de las alertas en tu contexto o componente
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== alertId)
      );
      console.log(`Alert with id ${alertId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  const handleViewUserClick = async (userId: string) => {
    try {
      const userData = await getUserById(userId);
      setSelectedUser(userData);
      setModalError(null);
      setIsModalOpen(true);
    } catch (error) {
      setModalError("No se pudo obtener la información del usuario.");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-semibold pb-3 px-10 md:px-28 text-cyan-950 dark:text-cyan-50">
        {t("HomeOrganization.active")}
      </h3>
      {error && <p className="text-red-500">{error}</p>}
      <Table>
        <thead className="border-b border-cyan-50 font-medium">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              {t("Table.id")}
            </th>
            <th scope="col" className="px-6 py-4">
              {t("Table.title")}
            </th>
            <th scope="col" className="px-6 py-4">
              {t("Table.description")}
            </th>
            <th scope="col" className="px-6 py-4">
              {t("Table.organization")}
            </th>
            <th scope="col" className="px-6 py-4">
              {t("Table.behaviors")}
            </th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="border-b border-neutral-200 dark:border-white/10"
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {alert.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{alert.userId}</td>
              <td className="whitespace-nowrap px-6 py-4">{alert.title}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {alert.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {alert.organizationName}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex w-full">
                  <button onClick={() => handleCheckboxClick(alert)}>
                    <IoCheckbox
                      size={30}
                      className="hover:text-cyan-200 transition-colors hover:scale-110"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(alert.id)}>
                    <IoTrashBinSharp
                      size={30}
                      className="hover:text-red-400 transition-colors hover:scale-110"
                    />
                  </button>
                  <button onClick={() => handleViewUserClick(alert.userId)}>
                    <IoSearchSharp
                      size={30}
                      className="hover:text-blue-300 transition-colors hover:scale-110"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-cyan-800 dark:text-cyan-100">
              {t("HomeOrganization.userData")}
            </h2>
            {modalError ? (
              <p className="text-red-500">{modalError}</p>
            ) : selectedUser ? (
              <div className="space-y-2 text-cyan-900 dark:text-cyan-100">
                <p>
                  <strong>{t("Login.id")}:</strong>{" "}
                  {selectedUser.identification}
                </p>
                <p>
                  <strong>{t("EditInfo.name")}:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>{t("EditInfo.email")}:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>{t("EditInfo.phone")}:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>{t("EditInfo.location")}:</strong>
                </p>
                {selectedUser &&
                  selectedUser.ubication &&
                  (() => {
                    const [lat, lng] = selectedUser.ubication
                      .split(",")
                      .map(Number);
                    return (
                      <div className="h-48 mt-4 rounded overflow-hidden">
                        <MapContainer
                          center={[lat, lng]}
                          zoom={13}
                          style={{ height: "100%", width: "100%" }}
                          scrollWheelZoom={false}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                          />
                          <Marker position={[lat, lng]} />
                        </MapContainer>
                      </div>
                    );
                  })()}
              </div>
            ) : (
              <p className="text-gray-500">Cargando...</p>
            )}
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-800"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Active;
