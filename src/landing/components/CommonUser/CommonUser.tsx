import { NavLink } from "react-router-dom";
import CommonUserImage from "@/assets/UsuarioRol.png";
import Button from "@/shared/ui/Button";

const CommonUser = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-20 md:px-32 px-8 text-cyan-950">
      <div className="flex flex-col justify-center md:w-96">
        <h1 className="font-semibold text-3xl text-center mb-8 md:text-5xl">
          Usuario Común
        </h1>
        <p>
          La lucha contra la violencia de género es algo que nos incumbe a
          todos, tanto a hombres como a mujeres, empieza a realizar un cambio y
          generar un cambio en nuestra sociedad, haz parte de Vigen.
        </p>
        <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
          <Button className="my-5">
            <NavLink to="/userSignup">Registrarse</NavLink>
          </Button>
        </div>
      </div>
      <div>
        <img src={CommonUserImage} alt="Usuario Rol" />
      </div>
    </div>
  );
};

export default CommonUser;
