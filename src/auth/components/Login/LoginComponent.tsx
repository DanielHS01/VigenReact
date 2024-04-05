import { FaRegCircleUser } from "react-icons/fa6";
import LoginForm from "./LoginForm";

const LoginComponent = () => {
  return (
    <div className="bg-cyan-950 flex rounded-xl justify-center p-4 w-96">
      <div className="bg-black bg-opacity-50 flex flex-col rounded-xl text-white justify-center p-4 w-full">
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
          <p className="uppercase font-bold">Crear Cuenta</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginComponent;
