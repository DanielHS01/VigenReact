import "@/landing/components/Hero/Hero.css";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="image-background bg-center bg-cover mx-11 my-6 h-[35rem] flex flex-col justify-center items-center rounded-[2rem] text-white space-y-2 p-5">
      <h1 className="text-center text-3xl md:text-6xl font-medium">
        {t("Hero.title")}
      </h1>
      <p className="text-center text-md md:text-xl">
        "{t("Hero.description")}"
      </p>
    </div>
  );
};

export default Hero;
