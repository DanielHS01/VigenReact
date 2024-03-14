import OrganizationImage from "@/assets/OrgRol.webp";
import { NavLink } from "react-router-dom";

const Organization = () => {
  return (
    <div className="px-8 md:grid md:grid-cols-2 md:gap-20 md:px-28 mt-10 py-5 md:mt bg-indigo-100 text-cyan-950">
      <div className="flex flex-col justify-center md:w-96 md:order-last">
        <h1 className="font-semibold text-3xl mb-8 text-center md:text-5xl">
          Organización
        </h1>
        <p>
          Entidad encargada de atención y control de casos de violencia de
          género, intrafamiliar, adulto mayor e infantil.
        </p>
        <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
          <button className="bg-cyan-950 rounded-md border text-white border-cyan-950 mt-4 px-5 py-1">
            <NavLink to="/signup">Registrarse</NavLink>
          </button>
        </div>
      </div>
      <div>
        <img src={OrganizationImage} alt="" className="md:scale-90" />
      </div>
    </div>
  );
};

export default Organization;
