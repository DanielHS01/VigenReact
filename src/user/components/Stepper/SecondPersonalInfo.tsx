import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const SecondPersonalInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-96 md:w-[60rem] h-full flex flex-col md:flex-row bg-indigo-100 md:justify-around text-cyan-950 text-sm p-5 rounded-xl">
      <div className="space-y-5 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.education")}</p>
        <div className="space-x-1">
          <Input
            type="radio"
            id="education-elementary"
            name="education"
            variant="radio"
          />
          <label htmlFor="education-elementary">{t("Poll.elementary")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="education-secondary"
            name="education"
            variant="radio"
          />
          <label htmlFor="education-secondary">{t("Poll.secondary")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="education-highschool"
            name="education"
            variant="radio"
          />
          <label htmlFor="education-highschool">{t("Poll.highschool")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="education-technical"
            name="education"
            variant="radio"
          />
          <label htmlFor="education-technical">{t("Poll.technical")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="education-undergraduate"
            name="education"
            variant="radio"
          />
          <label htmlFor="education-undergraduate">
            {t("Poll.undergraduate")}
          </label>
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.marital")}</p>
        <div className="space-x-1">
          <Input
            type="radio"
            id="marital-single"
            name="marital"
            variant="radio"
          />
          <label htmlFor="marital-single">{t("Poll.single")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="marital-married"
            name="marital"
            variant="radio"
          />
          <label htmlFor="marital-married">{t("Poll.married")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="marital-widowed"
            name="marital"
            variant="radio"
          />
          <label htmlFor="marital-widowed">{t("Poll.widowed")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="marital-free"
            name="marital"
            variant="radio"
          />
          <label htmlFor="marital-free">{t("Poll.free")}</label>
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.ethnic")}</p>
        <div className="space-x-1">
          <Input type="radio" id="ethnic-afro" name="ethnic" variant="radio" />
          <label htmlFor="ethnic-afro">{t("Poll.afro")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="ethnic-indigenous"
            name="ethnic"
            variant="radio"
          />
          <label htmlFor="ethnic-indigenous">{t("Poll.indigenous")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="ethnic-rom" name="ethnic" variant="radio" />
          <label htmlFor="ethnic-rom">{t("Poll.rom")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="ethnic-narp" name="ethnic" variant="radio" />
          <label htmlFor="ethnic-narp">{t("Poll.narp")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="ethnic-none" name="ethnic" variant="radio" />
          <label htmlFor="ethnic-none">{t("Poll.none")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="ethnic-other" name="ethnic" variant="radio" />
          <label htmlFor="ethnic-other">{t("Poll.other")}</label>
          <Input
            type="text"
            id="ethnic-other-text"
            name="ethnicOther"
            variant="textForm"
            className="ms-2"
          />
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5 md:hidden" />
      </div>

      <div className="space-y-5 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.income")}</p>
        <div className="space-x-1">
          <Input type="radio" id="income-yes" name="income" variant="radio" />
          <label htmlFor="income-yes">{t("Poll.yes")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="income-no" name="income" variant="radio" />
          <label htmlFor="income-no">{t("Poll.no")}</label>
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.classification")}</p>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-private"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-private">{t("Poll.private")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-government"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-government">
            {t("Poll.government")}
          </label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-domestic"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-domestic">{t("Poll.domestic")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-self"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-self">{t("Poll.self")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-employer"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-employer">{t("Poll.employer")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-unpaid"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-unpaid">{t("Poll.unpaid")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-student"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-student">{t("Poll.student")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="classification-unemployed"
            name="classification"
            variant="radio"
          />
          <label htmlFor="classification-unemployed">
            {t("Poll.unemployed")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SecondPersonalInfo;
