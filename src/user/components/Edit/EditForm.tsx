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
          password: "",
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
        password: formData.password || currentPassword,
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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-center mb-8 text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        {t("EditInfo.title")}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-12">
          <BasicInformation
            formData={formData}
            onInputChange={handleInputChange}
          />
          <Password
            formData={formData}
            onInputChange={handleInputChange}
            currentPassword={currentPassword}
          />
        </div>
        <div className="flex justify-center">
          <ContactInformation
            formData={formData}
            onInputChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button onClick={handleSave} className="px-6 py-3 hover:bg-cyan-700">
          {t("EditInfo.save")}
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
