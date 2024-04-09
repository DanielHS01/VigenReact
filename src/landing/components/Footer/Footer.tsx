import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";
import vigenBlanco from "@/assets/VigenLogo.png";

const Footer = () => {
  return (
    <div className="bg-cyan-950 text-white flex flex-col justify-center items-center space-y-2 py-10 text-xl">
      <div className="flex justify-center space-x-10">
        <FaFacebook size={40} className="cursor-pointer" />
        <FaXTwitter size={40} className="cursor-pointer" />
        <FaInstagram size={40} className="cursor-pointer" />
      </div>
      <img src={vigenBlanco} alt="Logo Vigen Footer" className="h-16" />
      <div className="text-center">
        <div className="flex justify-center text-center space-x-3 md:ms-8">
          <a href="#" className="hover:underline underline-offset-2">
            Información Legal
          </a>
          <a href="#" className="hover:underline underline-offset-2">
            Política de Privacidad
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Vigen</p>
      </div>
    </div>
  );
};

export default Footer;
