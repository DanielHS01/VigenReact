import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface PasswordProps {
  formData: { password: string };
  onInputChange: (name: string, value: string) => void;
}

const Password = ({ formData, onInputChange }: PasswordProps) => {
  const { t } = useTranslation();

  const rawCookie = Cookies.get("userData"); // Cambia 'cookie_name' al nombre real de tu cookie
  const pass = rawCookie
    ? JSON.parse(decodeURIComponent(rawCookie)).password
    : null;

  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">{t("EditInfo.password")}</p>
      <div className="flex flex-col">
        <label>Contraseña Actual</label>
        <Input
          type="password"
          value={pass}
          placeholder="1234567890"
          onChange={(e) => onInputChange("password", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.newPassword")}</label>
        <Input
          type="password"
          value={formData.password}
          placeholder="1234567890"
          onChange={(e) => onInputChange("password", e.target.value)}
        />
      </div>
    </FormContainer>
  );
};

export default Password;
