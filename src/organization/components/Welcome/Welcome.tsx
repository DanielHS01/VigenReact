import { useAuth } from "@/contexts/authContext";
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  const { userData } = useAuth();
  const orgName = userData?.name;
  return (
    <div className="text-cyan-950 dark:text-cyan-50 p-10 md:px-28 space-y-10">
      <h2 className="text-3xl font-semibold">
        {t("HomeOrganization.welcome")}
        {orgName}
      </h2>
      <p>{t("HomeOrganization.description")}</p>
    </div>
  );
};

export default Welcome;
