import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const Questions = () => {
  const { t } = useTranslation();

  return (
    <div className="w-96 md:w-[60rem] h-full flex flex-col md:flex-row  bg-indigo-100 md:justify-around text-cyan-950 text-sm p-5 rounded-xl">
      <div className="space-y-5 md:w-96">
        <p className="text-xl">{t("Poll.questionsDescription")}</p>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.punching")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.threatened")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.pressured")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5 md:hidden" />
      </div>
      <div className="space-y-5 my-5 md:my-0 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.belongings")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.shaken")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.assaulted")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
      </div>
    </div>
  );
};

export default Questions;
