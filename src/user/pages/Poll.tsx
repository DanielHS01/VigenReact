import { useTranslation } from "react-i18next";
import SurveyForm from "../components/Survery/SurveyForm";

const Poll = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col px-32">
        <h2 className="text-cyan-950 dark:text-cyan-50 text-3xl font-semibold">
          {t("Poll.title")}
        </h2>
        <p className="text-cyan-950 dark:text-cyan-50">
          {t("Poll.description")}
        </p>
      </div>
      <SurveyForm />
    </>
  );
};

export default Poll;
