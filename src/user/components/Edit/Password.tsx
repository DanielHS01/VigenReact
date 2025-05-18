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
    <FormContainer className="space-y-6 p-6 shadow-md rounded-lg mx-auto max-w-lg">
      <p className="text-center text-xl font-semibold">
        {t("EditInfo.password")}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.currentPassword")}</label>
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
          <label className="text-sm font-medium">{t("EditInfo.newPassword")}</label>
          <Input
            type="password"
            value={formData.password}
            placeholder="********"
            onChange={(e) => onInputChange("password", e.target.value)}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default Password;