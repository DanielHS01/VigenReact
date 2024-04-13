import Table from "@/shared/ui/Table";
import { useTranslation } from "react-i18next";

const Progress = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-2xl font-semibold pt-5 pb-3 px-10 md:px-28 text-cyan-950 dark:text-cyan-50">
        {t("HomeOrganization.progress")}
      </h3>
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

export default Progress;
