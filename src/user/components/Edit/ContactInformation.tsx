import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const ContactInformation = () => {
  const { t } = useTranslation();
  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">{t("EditInfo.contact")}</p>
      <Input />
      <Input />
      <div className="flex space-x-3">
        <Input />
        <Input className="w-52" />
      </div>
      <Input />
      <Input />
    </FormContainer>
  );
};

export default ContactInformation;
