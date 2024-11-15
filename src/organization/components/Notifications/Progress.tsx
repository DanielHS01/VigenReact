import { useEffect, useState } from "react";
import Table from "@/shared/ui/Table";
import { useTranslation } from "react-i18next";
import {
  fetchAlerts,
  fetchOrganizationType,
  Alert,
  deleteAlert,
  updateAlertState,
} from "@/organization/services/notifyService";
import { IoCheckbox, IoTrashBinSharp } from "react-icons/io5";

interface AlertWithOrgName extends Alert {
  organizationName: string;
}

const Progress = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<AlertWithOrgName[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAlertsWithOrgNames = async () => {
      try {
        const alertsData = await fetchAlerts();
        // Filtrar alertas con stateId igual a 1
        const filteredAlertsData = alertsData.filter(
          (alert) => alert.stateId === 1
        );

        const alertsWithOrgNames = await Promise.all(
          filteredAlertsData.map(async (alert) => {
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

  const handleCheckboxClick = async (alert: AlertWithOrgName) => {
    if (!alert.id) {
      console.error("Alert ID is undefined:", alert);
      return;
    }

    try {
      // Solo cambiamos el stateId en el objeto de alerta
      const updatedAlert: AlertWithOrgName = { ...alert, stateId: 2 };
      await updateAlertState(updatedAlert);

      // Actualiza el estado local para reflejar el cambio
      setAlerts((prevAlerts) =>
        prevAlerts.map((a) => (a.id === alert.id ? { ...a, stateId: 2 } : a))
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

  return (
    <>
      <h3 className="text-2xl font-semibold pt-5 pb-3 px-10 md:px-28 text-cyan-950 dark:text-cyan-50">
        {t("HomeOrganization.progress")}
      </h3>
      {error && <p className="text-red-500">{error}</p>}
      <Table className="mb-10">
        <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Progress;
