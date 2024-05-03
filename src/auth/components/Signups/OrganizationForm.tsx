import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";

const OrganizationForm = () => {
  const { t } = useTranslation();

  return (
    <FormContainer className="space-y-10 pt-10">
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        {t("Register.title")}
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
          {t("Register.privacy")}
        </p>
      </form>
    </FormContainer>
  );
};

export default OrganizationForm;
