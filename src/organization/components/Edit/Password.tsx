import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";

const Password = () => {
  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">Cambiar Contraseña</p>
      <Input />
      <Input />
      <Input />
    </FormContainer>
  );
};

export default Password;
