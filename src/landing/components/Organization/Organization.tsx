import OrganizationImage from "@/assets/Rol_Organización.png";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Organization = () => {
  const { t } = useTranslation();

  return (
    <div className="px-8 md:grid md:grid-cols-2 md:gap-2 justify-items-center md:px-28 py-1 bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50">
      <div className="flex flex-col justify-center md:w-96 md:order-last">
        <h1 className="font-semibold text-3xl mb-4 text-center md:text-5xl">
          {t("Roles.organizationTitle")}
        </h1>
        <p>{t("Roles.organizationDescription")}</p>
        <div className="flex flex-col justify-center items-center mb-2 md:mb-0">
          <Button className="my-2">
            <NavLink to="/organizationSignup">{t("Roles.rolesButton")}</NavLink>
          </Button>
        </div>
      </div>
      <div>
        <img src={OrganizationImage} alt="" className="h-96 md:scale-90" />
      </div>
    </div>
  );
};

export default Organization;