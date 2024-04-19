import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const SecondPersonalInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-96 md:w-[60rem] h-full flex flex-col md:flex-row  bg-indigo-100 md:justify-around text-cyan-950 text-sm p-5 rounded-xl">
      <div className="space-y-5 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.education")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.elementary")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.secondary")}</label>
        </div>
        <div>
          <Input type="radio" />
          <label htmlFor="">{t("Poll.highschool")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.technical")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.undergraduate")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.marital")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.single")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.married")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.widowed")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.free")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.ethnic")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.afro")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.indigenous")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.rom")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.narp")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.none")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.other")}</label>
          <Input type="text" className="ms-2" />
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5 md:hidden" />
      </div>
      <div className="space-y-5 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.income")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.no")}</label>
        </div>
        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.classification")}</p>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.private")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.government")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.domestic")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.self")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.employer")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.unpaid")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.student")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" />
          <label htmlFor="">{t("Poll.unemployed")}</label>
        </div>
      </div>
    </div>
  );
};

export default SecondPersonalInfo;
