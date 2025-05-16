import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

interface PasswordProps {
  formData: { password: string };
  onInputChange: (name: string, value: string) => void;
  currentPassword: string;
}

const Password = ({
  formData,
  onInputChange,
  currentPassword,
}: PasswordProps) => {
  const { t } = useTranslation();
  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">{t("EditInfo.password")}</p>
      <div className="flex flex-col">
        <label htmlFor="user-password">{t("EditInfo.currentPassword")}</label>
        <Input
          id="user-password"
          type="text"
          value={currentPassword}
          disabled
          placeholder="********"
          className="bg-slate-200"
        />
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.newPassword")}</label>
        <Input
          type="password"
          value={formData.password}
          placeholder="********"
          onChange={(e) => onInputChange("password", e.target.value)}
        />
      </div>
    </FormContainer>
  );
};

export default Password;
