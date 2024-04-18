import Button from "@/shared/ui/Button";
import MapImage from "@/assets/map-svgrepo-com.svg";
import BasicInformation from "@/user/components/Edit/BasicInformation";
import ContactInformation from "@/user/components/Edit/ContactInformation";
import Password from "@/user/components/Edit/Password";
import { useTranslation } from "react-i18next";

const EditForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-center mt-5 text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        {t("EditInfo.title")}
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 place-items-center space-y-10 md:space-y-0 items-center py-10">
        <BasicInformation />
        <ContactInformation />
        <Password />
        <img src={MapImage} width="300px" alt="" />
      </form>
      <div className="flex justify-center items-center mb-10">
        <Button>{t("EditInfo.save")}</Button>
      </div>
    </>
  );
};

export default EditForm;
