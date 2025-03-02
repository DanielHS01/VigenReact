import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const FirstPersonalInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-96 md:w-[60rem] h-full flex flex-col md:flex-row bg-indigo-100 md:justify-around text-cyan-950 text-sm p-5 rounded-xl">
      <div className="space-y-5 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.gender")}</p>
        <div className="space-x-1">
          <Input type="radio" id="gender-man" name="gender" variant="radio" />
          <label htmlFor="gender-man">{t("Poll.man")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="gender-woman" name="gender" variant="radio" />
          <label htmlFor="gender-woman">{t("Poll.woman")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="gender-binary"
            name="gender"
            variant="radio"
          />
          <label htmlFor="gender-binary">{t("Poll.binary")}</label>
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.orientation")}</p>

        <div className="space-x-1">
          <Input
            type="radio"
            id="orientation-hetero"
            name="orientation"
            variant="radio"
          />
          <label htmlFor="orientation-hetero">{t("Poll.hetero")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="orientation-homo"
            name="orientation"
            variant="radio"
          />
          <label htmlFor="orientation-homo">{t("Poll.homo")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="orientation-bi"
            name="orientation"
            variant="radio"
          />
          <label htmlFor="orientation-bi">{t("Poll.bi")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="orientation-asexual"
            name="orientation"
            variant="radio"
          />
          <label htmlFor="orientation-asexual">{t("Poll.asexual")}</label>
        </div>
        <div className="space-x-1">
          <Input
            type="radio"
            id="orientation-pan"
            name="orientation"
            variant="radio"
          />
          <label htmlFor="orientation-pan">{t("Poll.pan")}</label>
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.age")}</p>
        <Input type="number" id="age" name="age" variant="textForm" />

        <hr className="h-0.5 bg-cyan-950 my-5 md:hidden" />
      </div>

      <div className="space-y-5 my-5 md:my-0 md:w-96">
        <p className="font-semibold text-lg">{t("Poll.city")}</p>
        <div className="space-x-1">
          <Input type="radio" id="city-bogota" name="city" variant="radio" />
          <label htmlFor="city-bogota">Bogotá</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="city-madrid" name="city" variant="radio" />
          <label htmlFor="city-madrid">Madrid</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="city-mosquera" name="city" variant="radio" />
          <label htmlFor="city-mosquera">Mosquera</label>
        </div>
        <div className="space-x-2">
          <Input type="radio" id="city-other" name="city" variant="radio" />
          <label htmlFor="city-other">{t("Poll.other")}</label>
          <Input
            type="text"
            id="other-city"
            name="otherCity"
            variant="textForm"
            className="ms-2"
          />
        </div>

        <hr className="h-0.5 bg-cyan-950 my-5" />
        <p className="font-semibold text-lg">{t("Poll.area")}</p>
        <div className="space-x-1">
          <Input type="radio" id="area-rural" name="area" variant="radio" />
          <label htmlFor="area-rural">{t("Poll.rural")}</label>
        </div>
        <div className="space-x-1">
          <Input type="radio" id="area-urban" name="area" variant="radio" />
          <label htmlFor="area-urban">{t("Poll.urban")}</label>
        </div>
      </div>
    </div>
  );
};

export default FirstPersonalInfo;
