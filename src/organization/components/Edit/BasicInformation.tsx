import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";

const BasicInformation = () => {
  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">Información Básica</p>
      <Input />
      <Input />
      <Input />
      <Input />
    </FormContainer>
  );
};

export default BasicInformation;
