import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Gender from "@/organization/components/Statistics/Gender";
import Violence from "@/organization/components/Statistics/Violence";
import Education from "@/organization/components/Statistics/Education";
import Orientation from "@/organization/components/Statistics/Orientation";

const Statistics = () => {
  const { t } = useTranslation(); // Hook to access translation function

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen text-cyan-950">
        <h1 className="text-2xl font-semibold mb-6">{t("statisticsDashboard.title")}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t("statisticsDashboard.gender")}</h2>
            <div className="h-96">
              <Gender />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t("statisticsDashboard.violence")}</h2>
            <div className="h-96">
              <Violence />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t("statisticsDashboard.education")}</h2>
            <div className="h-96">
              <Education />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t("statisticsDashboard.orientation")}</h2>
            <div className="h-96">
              <Orientation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;