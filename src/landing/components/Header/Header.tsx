import { NavLink } from "react-router-dom";
import Nav from "@/landing/components/Header/Nav";
import Logo from "@/assets/Logo";

const Header = () => {
  return (
    <div className="bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-50 sticky top-0 z-20 mx-auto flex w-full items-center justify-between px-10 py-4 flex-wrap text-cyan-950">
      <div className="lg:ms-16 rounded-lg transition-colors p-2">
        <NavLink to="/">
          <Logo className="fill-cyan-950 dark:fill-white" />
        </NavLink>
      </div>
      <Nav />
    </div>
  );
};

export default Header;
