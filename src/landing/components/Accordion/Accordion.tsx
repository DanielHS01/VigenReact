import { useState } from "react";
import { useTranslation } from "react-i18next";

const Accordion = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t("Accordion.firstTitle"));
  const [description, setDescription] = useState(
    t("Accordion.firstDescription")
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        setTitle(t("Accordion.firstTitle"));
        setDescription(t("Accordion.firstDescription"));
        break;
      case 1:
        setTitle(t("Accordion.secondTitle"));
        setDescription(t("Accordion.secondDescription"));
        break;
      case 2:
        setTitle(t("Accordion.thirdTitle"));
        setDescription(t("Accordion.thirdDescription"));
        break;
      case 3:
        setTitle(t("Accordion.fourthTitle"));
        setDescription(t("Accordion.fourthDescription"));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:justify-around space-x-5 relative bottom-32 text-cyan-950 p-10 dark:text-indigo-100">
      <div className="flex flex-col space-y-2 bg-white p-5 w-64 rounded-2xl shadow-2xl dark:bg-customCyan">
        <p
          className={`cursor-pointer hover:bg-gray-200 transition-colors p-1 rounded-md dark:hover:bg-cyan-800 ${
            activeIndex === 0 ? "underline" : ""
          }`}
          onClick={() => handleClick(0)}
        >
          {t("Accordion.firstTitle")}
        </p>
        <p
          className={`cursor-pointer hover:bg-gray-200 transition-colors p-1 rounded-md dark:hover:bg-cyan-800 ${
            activeIndex === 1 ? "underline" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          {t("Accordion.secondTitle")}
        </p>
        <p
          className={`cursor-pointer hover:bg-gray-200 transition-colors p-1 rounded-md dark:hover:bg-cyan-800 ${
            activeIndex === 2 ? "underline" : ""
          }`}
          onClick={() => handleClick(2)}
        >
          {t("Accordion.thirdTitle")}
        </p>
        <p
          className={`cursor-pointer hover:bg-gray-200 transition-colors p-1 rounded-md dark:hover:bg-cyan-800 ${
            activeIndex === 3 ? "underline" : ""
          }`}
          onClick={() => handleClick(3)}
        >
          {t("Accordion.fourthTitle")}
        </p>
      </div>
      <div className="bg-white flex w-64 md:w-[45rem] p-5 rounded-2xl shadow-2xl dark:bg-customCyan">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium mb-1 flex text-start">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
