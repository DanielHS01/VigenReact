import Table from "@/shared/ui/Table";
import { useTranslation } from "react-i18next";

const Active = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-2xl font-semibold pb-3 px-10 md:px-28 text-cyan-950 dark:text-cyan-50">
        {t("HomeOrganization.active")}
      </h3>
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
          <tr className="border-b border-neutral-200 dark:border-white/10">
            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
            <td className="whitespace-nowrap px-6 py-4">25</td>
            <td className="whitespace-nowrap px-6 py-4">Ayuda</td>
            <td className="whitespace-nowrap px-6 py-4">Ayuda</td>
            <td className="whitespace-nowrap px-6 py-4">Casa de la Mujer</td>
            <td className="whitespace-nowrap px-6 py-4">Aceptar</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Active;
