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
    <FormContainer className="px-4 sm:px-6 md:px-10">
      <p className="text-center mb-4 text-sm sm:text-base md:text-lg font-regular text-white">
        {t("EditInfo.password")}
      </p>
      <label
        htmlFor="password"
        className="block text-sm sm:text-base font-regular text-white"
      >
        {t("EditInfo.newPassword")}
      </label>
      <Input
        id="password"
        type="password"
        value={values.password}
        onChange={onChange}
        placeholder={t("EditInfo.newPasswordPlaceholder") || "Nueva contraseña"}
        className="w-full bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </FormContainer>
  );
};

export default Password;