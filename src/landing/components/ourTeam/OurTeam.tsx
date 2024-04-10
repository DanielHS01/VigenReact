import Button from "@/shared/ui/Button";
import ourTeam1 from "@/assets/Nosotros1.png";
import ourTeam2 from "@/assets/Nosotros2.png";
import ourTeam3 from "@/assets/Nosotros3.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OurTeam = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-indigo-100 py-16 relative text-cyan-950 dark:bg-cyan-900 dark:text-indigo-100">
      <h3 className="text-3xl text-center">{t("OurTeam.title")}</h3>
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row pt-10 justify-around items-center">
        <img src={ourTeam1} className="h-60 w-60 rounded-2xl" alt="" />
        <img src={ourTeam2} className="h-60 w-60 rounded-2xl" />
        <img src={ourTeam3} className="h-60 w-60 rounded-2xl" />
      </div>
      <div className="flex justify-center pt-10">
        <Button>
          <Link to="/aboutUs">{t("OurTeam.button")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default OurTeam;
