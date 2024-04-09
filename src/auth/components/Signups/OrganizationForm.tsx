import Button from "@/shared/ui/Button";
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";

const OrganizationForm = () => {
  return (
    <FormContainer className="space-y-10 pt-10">
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        Crear Cuenta
      </p>
      <form action="" className="space-y-5">
        <Input type="text" placeholder="NIT" />
        <Input type="text" placeholder="Organización" />
        <Input type="text" placeholder="Teléfono" />
        <div className="flex space-x-5">
          <Input type="text" placeholder="Indicativo" />
          <Input type="text" placeholder="Celular" />
        </div>
        <div className="flex space-x-5">
          <Input type="text" placeholder="Contraseña" />
          <Input type="text" placeholder="Confirmar Contraseña" />
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

export default OrganizationForm;
