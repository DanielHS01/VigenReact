import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import Button from "@/shared/ui/Button";
import Dropdown from "@/landing/components/Header/Dropdown";

const NavLinks = () => {
  return (
    <>
      <NavLink
        to="/"
        className="hover:underline underline-offset-2 transition-colors rounded-lg"
      >
        Inicio
      </NavLink>
      <NavLink
        to="/aboutUs"
        className="hover:underline underline-offset-2 transition-colors rounded-lg"
      >
        Sobre Nosotros
      </NavLink>
      <NavLink
        to="/help"
        className="hover:underline underline-offset-2 transition-colors rounded-lg"
      >
        Ayuda
      </NavLink>
    </>
  );
};

const NavButtons = () => {
  return (
    <>
      <Dropdown />
      <Button variant="secondary">
        <NavLink to="/roles">Registro</NavLink>
      </Button>
      <Button>
        <NavLink to="/login">Inicio</NavLink>
      </Button>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav
        className=" w-7/12 md:w-10/12 lg:w-7/12 justify-end md:justify-between items-center flex"
        id="topNavbar"
      >
        <div className="hidden md:flex space-x-5">
          <NavLinks />
        </div>
        <div className="hidden items-center md:flex space-x-5">
          <NavButtons />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <FaX /> : <FaBars />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <>
          <div className="flex flex-col items-center basis-full animate-fade-down space-y-4 text-xl md:hidden mb-5">
            <NavLinks />
          </div>
          <div className="grid grid-cols-2 gap-5 items-center basis-full animate-fade-down space-y-4 text-xl md:hidden">
            <NavButtons />
          </div>
        </>
      )}
    </>
  );
};

export default Nav;
