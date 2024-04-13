import BasicInformation from "@/organization/components/Edit/BasicInformation";
import Password from "@/organization/components/Edit/Password";
import Button from "@/shared/ui/Button";

const EditForm = () => {
  return (
    <>
      <h2 className="text-center mt-5 text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        Editar Información
      </h2>
      <form className="flex flex-col md:flex-row justify-center md:justify-evenly items-center space-y-10 py-10">
        <div className="">
          <BasicInformation />
        </div>
        <div className="flex flex-col justify-center items-center space-y-10">
          <Password />
          <Button variant="primary" className="text-red">
            Guardar Información
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
