import { NavLink } from "react-router-dom";
import vigenAzul from "@/assets/VigenAzul.png";
import Nav from "@/landing/components/Header/Nav";

const Header = () => {
  return (
    <>
      <div className="bg-cyan-50 sticky top-0 z-20 mx-auto flex w-full items-center justify-between px-10 py-4 flex-wrap text-cyan-950">
        <div className="lg:ms-16">
          <NavLink to="/">
            <img src={vigenAzul} alt="Logo Vigen Blanco" className="w-16" />
          </NavLink>
        </div>
        <Nav />
      </div>
    </>
  );
};

export default Header;
