import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const BasicInformation = () => {
  const { t } = useTranslation();

  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">{t("EditInfo.basic")}</p>
      <Input />
      <Input />
      <Input />
      <Input />
    </FormContainer>
  );
};

export default BasicInformation;
