import { OrganizationData } from "@/auth/services/authServices";
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

interface Props {
  values: OrganizationData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Password = ({ values, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <FormContainer className="px-10">
      <p className="text-center mb-5">{t("EditInfo.password")}</p>
      <label htmlFor="password">{t("EditInfo.newPassword")}</label>
      <Input
        id="password"
        type="password"
        value={values.password}
        onChange={onChange}
        placeholder="Nueva contraseña"
        className="bg-slate-200"
      />
    </FormContainer>
  );
};

export default Password;
