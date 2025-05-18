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
    <FormContainer className="space-y-6 p-6 shadow-md rounded-lg ">
      <p className="text-center text-xl font-semibold">
        {t("EditInfo.basic")}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.identification")}</label>
          <Input
            value={formData.identification}
            placeholder={t("EditInfo.identification")}
            onChange={(e) => onInputChange("identification", e.target.value)}
            disabled
            className="bg-slate-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.name")}</label>
          <Input
            value={formData.name}
            placeholder={t("EditInfo.name")}
            onChange={(e) => onInputChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.gender")}</label>
          <Input
            value={formData.gender}
            placeholder={t("EditInfo.gender")}
            onChange={(e) => onInputChange("gender", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.marital_status")}</label>
          <Input
            value={formData.maritalStatus}
            placeholder={t("EditInfo.marital_status")}
            onChange={(e) => onInputChange("maritalStatus", e.target.value)}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default BasicInformation;