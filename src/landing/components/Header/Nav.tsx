import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaX, FaGlobe } from "react-icons/fa6";

const NavLinks = () => {
  return (
    <>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/aboutUs">Sobre Nosotros</NavLink>
      <NavLink to="/help">Ayuda</NavLink>
    </>
  );
};

const NavButtons = () => {
  return (
    <>
      <FaGlobe className="cursor-pointer" />
      <button className="border border-cyan-950 px-6 py-2 rounded-md text-cyan-950">
        <NavLink to="/roles">Registro</NavLink>
      </button>
      <button className="bg-cyan-950 px-8 py-2 rounded-md text-white">
        <NavLink to="/login">Inicio</NavLink>
      </button>
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
        <div className="hidden justify-center md:flex space-x-5">
          <NavLinks />
        </div>
        <div className="hidden justify-center items-center md:flex space-x-5">
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
          <div className="flex flex-col items-center basis-full animate-fade-down space-y-4 text-xl md:hidden">
            <NavButtons />
          </div>
        </>
      )}
    </>
  );
};

export default Nav;
