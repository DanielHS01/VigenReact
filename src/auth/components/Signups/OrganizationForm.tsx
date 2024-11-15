// OrganizationRegistration.tsx
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  OrganizationData,
  registerOrganization,
} from "@/auth/services/authServices";

const OrganizationRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OrganizationData>({
    nit: "",
    password: "",
    name: "",
    tel: "",
    phone: "",
    organizationTypeID: 1, // Default organization type ID
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerOrganization(formData);
      setSuccessMessage(t("Register.success"));
      setErrorMessage(null);

      setTimeout(() => {
        navigate("/headquarterSignup");
      }, 2000);
    } catch (error) {
      console.error("Failed to register organization:", error);
      setSuccessMessage(null);
      setErrorMessage(t("Register.error"));
    }
  };

  return (
    <FormContainer>
      <h2 className="text-center text-lg font-semibold mb-4">
        {t("Register.title")}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          name="nit"
          placeholder="NIT"
          value={formData.nit}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="name"
          placeholder="Organización"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="tel"
          placeholder="Teléfono"
          value={formData.tel}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="phone"
          placeholder="Celular"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">{t("Register.button")}</Button>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
      </form>
    </FormContainer>
  );
};

export default OrganizationRegistration;
