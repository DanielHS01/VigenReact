import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const FirstPersonalInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-96 md:w-[60rem] h-full flex flex-col md:flex-row  bg-indigo-100 md:justify-around text-cyan-950 text-sm p-5 rounded-xl">
      <div className="space-y-5 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.gender")}</p>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.man")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.woman")}</label>
        </div>
        <div>
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.binary")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.orientation")}</p>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.hetero")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.homo")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.bi")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.asexual")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.pan")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.age")}</p>
        <Input type="number" variant="textForm" />
        <hr className="h-0.5 bg-cyan-950 my-5 md:hidden" />
      </div>
      <div className="space-y-5 my-5 md:my-0 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.city")}</p>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">Bogotá</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">Madrid</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">Mosquera</label>
        </div>
        <div className="space-x-2">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.other")}</label>
          <Input type="text" variant="textForm" className="ms-2" />
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.area")}</p>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.rural")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" variant="radio" />
          <label htmlFor="">{t("Poll.urban")}</label>
        </div>
      </div>
    </div>
  );
};

export default FirstPersonalInfo;
