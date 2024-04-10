import udecImage from "@/assets/udec.jpg";
import { useTranslation } from "react-i18next";

const AboutUsComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-cyan-50 md:mb-0 text-cyan-950 w-full dark:bg-cyan-950 dark:text-cyan-50">
      <div className="p-15 relative flex flex-col w-full overflow-hidden">
        <img
          src={udecImage}
          className="opacity-30 md:translate-x-24 xl:translate-x-[39rem] md:h-[45rem] lg:h-[36rem] h-[38rem] lg:w-[50rem] inset-0 object-cover relative"
        />
        <div className="absolute md:left-28 md:w-[38rem] flex flex-col w-full justify-center p-10 md:text-start mt-16 lg:mt-16 z-10">
          <h2 className="md:text-5xl mb-5 text-4xl font-semibold">
            {t("AboutUs.title")}
          </h2>
          <p>{t("AboutUs.description")}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-cyan-50 dark:to-cyan-950" />
      </div>
    </div>
  );
};

export default AboutUsComponent;
