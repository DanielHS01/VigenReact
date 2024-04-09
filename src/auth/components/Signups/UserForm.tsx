import Button from "@/shared/ui/Button";
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";

const UserForm = () => {
  return (
    <FormContainer className="space-y-5">
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        Crear Cuenta
      </p>
      <form action="" className="space-y-5">
        <Input type="text" placeholder="Identificación" />
        <Input type="text" placeholder="Nombre" />
        <Input type="text" placeholder="Correo" />
        <Input type="text" placeholder="Género" />
        <div className="flex space-x-5">
          <Input type="text" placeholder="Indicativo" />
          <Input type="text" placeholder="Celular" />
        </div>
        <Input type="date" />
        <Input type="text" placeholder="Ocupación" />
        <div className="flex space-x-5">
          <Input type="text" placeholder="Código Postal" />
          <Input type="text" placeholder="Estado Civil" />
        </div>
        <div className="flex space-x-5">
          <Input type="password" placeholder="Contraseña" />
          <Input type="password" placeholder="Confirmar Contraseña" />
        </div>
        <p className="text-xs font-thin cursor-pointer hover:text-gray-200 transition-colors hover:underline underline-offset-2">
          Acuerdo de Privacidad
        </p>
        <div className="flex justify-center">
          <Button variant="outline">Registrar</Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default UserForm;
