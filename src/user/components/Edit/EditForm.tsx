import { useState, useEffect } from "react";
import Button from "@/shared/ui/Button";
import BasicInformation from "@/user/components/Edit/BasicInformation";
import ContactInformation from "@/user/components/Edit/ContactInformation";
import Password from "@/user/components/Edit/Password";
import { useTranslation } from "react-i18next";
import { updateUser, getUserById } from "@/auth/services/authServices";
import Cookies from "js-cookie";

const EditForm = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [formData, setFormData] = useState({
    identification: "",
    name: "",
    gender: "",
    birthdate: "",
    maritalStatus: "",
    email: "",
    occupation: "",
    countryCode: "",
    phone: "",
    postalCode: "",
    ubication: "",
    password: "",
    verification: "",
    code: "",
  });
  const rawCookie = Cookies.get("userData");
  const userId = rawCookie
    ? JSON.parse(decodeURIComponent(rawCookie)).identification
    : null;

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
        setFormData((prevData) => ({
          ...prevData,
          identification: userData.identification || prevData.identification,
          name: userData.name || prevData.name,
          gender: userData.gender || prevData.gender,
          birthdate: userData.birthdate || prevData.birthdate,
          maritalStatus: userData.maritalStatus || prevData.maritalStatus,
          email: userData.email || prevData.email,
          occupation: userData.occupation || prevData.occupation,
          countryCode: userData.countryCode || prevData.countryCode,
          phone: userData.phone || prevData.phone,
          postalCode: userData.postalCode || prevData.postalCode,
          ubication: userData.ubication || prevData.ubication,
          password: userData.password || prevData.password,
          verification: userData.verification,
          code: userData.code,
        }));
        setCurrentPassword(userData.password);
        console.log("userData:", userData);
      } catch (error) {
        console.error("Error loading user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const finalData = {
        ...formData,
        password: formData.password || currentPassword, // usa la actual si no hay nueva
      };

      const response = await updateUser(formData.identification, finalData);
      console.log("Respuesta del servidor:", response);
      alert(t("EditInfo.success"));
    } catch (error) {
      console.error("Error en handleSave:", error);
      alert(t("EditInfo.error"));
    }
  };

  return (
    <>
      <h2 className="text-center mt-5 text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        {t("EditInfo.title")}
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 place-items-center space-y-10 md:space-y-0 items-center py-10">
        <BasicInformation
          formData={formData}
          onInputChange={handleInputChange}
        />
        <ContactInformation
          formData={formData}
          onInputChange={handleInputChange}
        />
        <Password
          formData={formData}
          onInputChange={handleInputChange}
          currentPassword={currentPassword}
        />
      </form>
      <div className="flex justify-center items-center mb-10">
        <Button onClick={handleSave}>{t("EditInfo.save")}</Button>
      </div>
    </>
  );
};

export default EditForm;
