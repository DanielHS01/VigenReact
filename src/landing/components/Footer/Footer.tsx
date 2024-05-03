import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/Logo";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-cyan-950 text-white flex flex-col justify-center items-center space-y-2 py-10 text-xl dark:bg-customCyan">
      <div className="flex justify-center space-x-10">
        <FaFacebook size={40} className="cursor-pointer hover:scale-110" />
        <FaXTwitter size={40} className="cursor-pointer hover:scale-110" />
        <FaInstagram size={40} className="cursor-pointer hover:scale-110" />
      </div>
      <Logo className="scale-125 my-2 fill-white" />
      <div className="text-center">
        <div className="flex justify-center text-center space-x-3 md:ms-8">
          <a href="#" className="hover:underline underline-offset-2">
            {t("Footer.legal")}
          </a>
          <a href="#" className="hover:underline underline-offset-2">
            {t("Footer.privacy")}
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Vigen</p>
      </div>
    </div>
  );
};

export default Footer;
