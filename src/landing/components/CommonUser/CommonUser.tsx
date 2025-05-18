import { NavLink } from "react-router-dom";
import CommonUserImage from "@/assets/Rol_Comun.png";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

const CommonUser = () => {
  const { t } = useTranslation();

  return (
    <div className="md:grid md:grid-cols-2 justify-items-center md:px-32 px-8 text-cyan-950 dark:text-cyan-50">
      <div className="flex flex-col justify-center md:w-96">
        <h1 className="font-semibold text-3xl text-center mb-8 md:text-5xl">
          {t("Roles.commonUserTitle")}
        </h1>
        <p>{t("Roles.commonUserDescription")}</p>
        <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
          <Button className="my-5">
            <NavLink to="/userSignup">{t("Roles.rolesButton")}</NavLink>
          </Button>
        </div>
      </div>
      <div>
        <img src={CommonUserImage} alt="Usuario Rol" className="h-96 scale-125"/>
      </div>
    </div>
  );
};

export default CommonUser;
