import { OrganizationData } from "@/auth/services/authServices"; // o el lugar donde esté
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

interface Props {
  values: OrganizationData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInformation = ({ values, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <FormContainer className="px-10">
      <p className="text-center mb-5">{t("EditInfo.basic")}</p>
      <label htmlFor="nit">{t("EditInfo.nit")}</label>
      <Input
        id="nit"
        value={values.nit}
        onChange={onChange}
        disabled
        className="bg-slate-200"
      />

      <label htmlFor="name">{t("EditInfo.nameOrg")}</label>
      <Input id="name" value={values.name} onChange={onChange} />

      <label htmlFor="tel">{t("EditInfo.tel")}</label>
      <Input id="tel" value={values.tel} onChange={onChange} />

      <label htmlFor="phone">{t("EditInfo.phone")}</label>
      <Input id="phone" value={values.phone} onChange={onChange} />
    </FormContainer>
  );
};

export default BasicInformation;
