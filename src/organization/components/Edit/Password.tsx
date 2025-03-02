import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const Password = () => {
  const { t } = useTranslation();

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
