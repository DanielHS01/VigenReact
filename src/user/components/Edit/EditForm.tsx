import { useState, useEffect, useRef, useCallback } from "react";
import Button from "@/shared/ui/Button";
import BasicInformation from "@/user/components/Edit/BasicInformation";
import ContactInformation from "@/user/components/Edit/ContactInformation";
import Password from "@/user/components/Edit/Password";
import { useTranslation } from "react-i18next";
import { updateUser, getUserById } from "@/auth/services/authServices";
import Cookies from "js-cookie";
import { FaCheck } from "react-icons/fa";

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
  const [modal, setModal] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({ message: "", type: "success", visible: false });

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  // Handle Escape key to close modal
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && modal.visible) {
      setModal((prev) => ({ ...prev, visible: false }));
    }
  }, [modal.visible]);

  // Focus management for accessibility
  useEffect(() => {
    if (modal.visible) {
      document.addEventListener("keydown", handleEscapeKey);
      closeButtonRef.current?.focus();
    } else {
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modal.visible, handleEscapeKey]);

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
      setModal({
        message: t("EditInfo.success"),
        type: "success",
        visible: true,
      });
    } catch (error) {
      console.error("Error en handleSave:", error);
      setModal({
        message: t("EditInfo.error"),
        type: "error",
        visible: true,
      });
    }
  };

  return (
    <div className="max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto p-2 sm:p-4 md:p-6 overflow-x-hidden">
      {modal.visible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6 transform transition-all"
            style={{ backgroundColor: '#f3f4f6' }}
          >
            {/* Modal Header */}
            <div className="flex justify-center mb-4">
              <FaCheck className="text-4xl text-green-500"  />
            </div>
            {/* Modal Body */}
            <div className="text-center">
              <h3
                id="modal-title"
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                {t("EditInfo.title")}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {t("EditInfo.successTitle")}
              </p>
            </div>
            {/* Modal Footer */}
            <div className="flex justify-center">
              <button
                ref={closeButtonRef}
                onClick={() => setModal((prev) => ({ ...prev, visible: false }))}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {t("EditInfo.close")}
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-center mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        {t("EditInfo.title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="space-y-4 sm:space-y-6 ml-4 sm:ml-4 md:ml-40">
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
      <div className="flex justify-center mt-4 sm:mt-6 md:mt-10">
        <Button onClick={handleSave} className="px-6 py-2 sm:px-8 sm:py-3 hover:bg-cyan-700">
          {t("EditInfo.save")}
        </Button>
      </div>
    </div>
  );
};

export default EditForm;