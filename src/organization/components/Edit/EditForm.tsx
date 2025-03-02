import BasicInformation from "@/organization/components/Edit/BasicInformation";
import Password from "@/organization/components/Edit/Password";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

const EditForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-center mt-5 text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        {t("EditInfo.title")}
      </h2>
      <form className="flex flex-col md:flex-row justify-center md:justify-evenly items-center space-y-10 md:space-y-0 py-10">
        <div className="">
          <BasicInformation />
        </div>
        <div className="flex flex-col justify-center items-center space-y-10">
          <Password />
          <Button variant="primary">{t("EditInfo.save")}</Button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
