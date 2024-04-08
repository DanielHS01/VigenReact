import { FaRegCircleUser } from "react-icons/fa6";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import FormContainer from "@/shared/ui/FormContainer";

const LoginComponent = () => {
  return (
    <FormContainer>
      <div className="flex justify-center">
        <div className="relative bottom-14 bg-cyan-950 rounded-full flex justify-center w-16 h-16 items-center">
          <FaRegCircleUser size={50} />
        </div>
      </div>
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        Iniciar Sesión
      </p>
      <div className="flex justify-between text-xs md:text-sm py-5">
        <p className="font-thin">No tienes cuenta?</p>
        <Link
          to="/roles"
          className="uppercase font-bold hover:text-gray-200 transition-colors"
        >
          Crear Cuenta
        </Link>
      </div>
      <LoginForm />
      <p className="text-end text-xs py-2 font-thin cursor-pointer hover:text-gray-200 transition-colors">
        Olvidé mi contraseña
      </p>
    </FormContainer>
  );
};

export default LoginComponent;
