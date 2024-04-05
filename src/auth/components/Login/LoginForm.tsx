import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";

const LoginForm = () => {
  return (
    <form className="space-y-3">
      <div className="flex flex-col">
        <label>Usuario</label>
        <Input type="text" placeholder="danielhs" />
      </div>
      <div className="flex flex-col">
        <label>Contraseña</label>
        <Input type="password" placeholder="********" />
      </div>
      <div className="flex justify-center p-3">
        <Button>Ingresar</Button>
      </div>
    </form>
  );
};

export default LoginForm;
