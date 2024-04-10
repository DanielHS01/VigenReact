import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <form className="space-y-3">
      <div className="flex flex-col">
        <label>{t("Login.user")}</label>
        <Input type="text" placeholder="danielhs" />
      </div>
      <div className="flex flex-col">
        <label>{t("Login.password")}</label>
        <Input type="password" placeholder="********" />
      </div>
      <div className="flex justify-center p-3">
        <Button variant="outline">{t("Login.button")}</Button>
      </div>
    </form>
  );
};

export default LoginForm;
