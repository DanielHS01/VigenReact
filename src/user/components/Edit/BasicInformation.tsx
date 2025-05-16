import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

interface BasicInformationProps {
  formData: {
    identification: string;
    name: string;
    gender: string;
    birthdate: string;
    maritalStatus: string;
  };
  onInputChange: (name: string, value: string) => void;
}

const BasicInformation = ({
  formData,
  onInputChange,
}: BasicInformationProps) => {
  const { t } = useTranslation();

  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center text-lg">{t("EditInfo.basic")}</p>
      <div className="flex flex-col">
        <label>{t("EditInfo.identification")}</label>
        <Input
          value={formData.identification}
          placeholder={t("EditInfo.identification")}
          onChange={(e) => onInputChange("identification", e.target.value)}
          disabled
          className="bg-slate-200"
        />
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.name")}</label>
        <Input
          value={formData.name}
          placeholder={t("EditInfo.name")}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.gender")}</label>
        <Input
          value={formData.gender}
          placeholder={t("EditInfo.gender")}
          onChange={(e) => onInputChange("gender", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.marital_status")}</label>
        <Input
          value={formData.maritalStatus}
          placeholder={t("EditInfo.marital_status")}
          onChange={(e) => onInputChange("maritalStatus", e.target.value)}
        />
      </div>
    </FormContainer>
  );
};

export default BasicInformation;
