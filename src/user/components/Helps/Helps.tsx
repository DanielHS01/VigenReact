import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FaPhoneVolume, FaTruckMedical, FaRegFileLines } from "react-icons/fa6";

interface helpCards {
  icon: IconType;
  title: string;
}

const Helps = () => {
  const { t } = useTranslation();

  const HELP_CARDS: helpCards[] = [
    {
      icon: FaPhoneVolume,
      title: t("HomeUser.phone"),
    },
    {
      icon: FaRegFileLines,
      title: t("HomeUser.poll"),
    },
    {
      icon: FaTruckMedical,
      title: t("HomeUser.care"),
    },
  ];
  return (
    <div className="bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50">
      <div className=" w-full relative bottom-16 flex flex-col md:flex-row items-center justify-around space-y-10 md:space-y-0 px-10 py-28 bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50">
        {HELP_CARDS.map((item, index) => (
          <button
            key={index}
            className="w-64 h-32 md:w-80 md:h-40 rounded-xl bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50 p-2 shadow-2xl dark:shadow-lg dark:shadow-customCyan flex flex-col justify-center items-center space-y-2 hover:scale-110 transition-all duration-300"
          >
            <item.icon size={35} />
            <h3 className="text-2xl font-semibold">{item.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Helps;
