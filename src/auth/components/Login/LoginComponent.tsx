import { FaRegCircleUser } from "react-icons/fa6";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import FormContainer from "@/shared/ui/FormContainer";
import { useTranslation } from "react-i18next";

const LoginComponent = () => {
  const { t } = useTranslation();

  return (
    <FormContainer>
      <div className="flex justify-center">
        <div className="relative bottom-14 bg-cyan-950 dark:bg-customCyan rounded-full flex justify-center w-16 h-16 items-center">
          <FaRegCircleUser size={50} />
        </div>
      </div>
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        {t("Login.title")}
      </p>
      <div className="flex justify-between text-xs md:text-sm py-5">
        <p className="font-thin">{t("Login.notAccount")}</p>
        <Link
          to="/roles"
          className="uppercase font-bold hover:text-gray-200 transition-colors hover:underline underline-offset-2"
        >
          {t("Login.createAccount")}
        </Link>
      </div>
      <LoginForm />
      <Link
        to="/resetPassword"
        className="text-end text-xs py-2 font-thin cursor-pointer hover:text-gray-200 transition-colors hover:underline underline-offset-2 block"
      >
        {t("Login.forgotPassword")}
      </Link>
    </FormContainer>
  );
};

export default LoginComponent;
