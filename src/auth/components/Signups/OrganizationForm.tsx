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
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrganizationData, string>>
  >({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validación para un campo específico (en onBlur)
  const validateField = (name: keyof OrganizationData, value: string) => {
    const newErrors: Partial<Record<keyof OrganizationData, string>> = { ...errors };

    switch (name) {
      case "nit": {
        if (value && !/^\d+$/.test(value)) {
          newErrors.nit = t("Register.errors.nitInvalid");
        } else {
          delete newErrors.nit;
        }
        break;
      }
      case "name": {
        if (value && value.length < 2) {
          newErrors.name = t("Register.errors.nameTooShort");
        } else {
          delete newErrors.name;
        }
        break;
      }
      case "tel": {
        if (value && !/^\d{7,15}$/.test(value)) {
          newErrors.tel = t("Register.errors.telInvalid");
        } else {
          delete newErrors.tel;
        }
        break;
      }
      case "phone": {
        if (value && !/^\d{7,15}$/.test(value)) {
          newErrors.phone = t("Register.errors.phoneInvalid");
        } else {
          delete newErrors.phone;
        }
        break;
      }
      case "password": {
        if (value && value.length < 8) {
          newErrors.password = t("Register.errors.passwordTooShort");
        } else {
          delete newErrors.password;
        }
        break;
      }
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validación completa para el submit
  const validateForm = () => {
    const newErrors: Partial<Record<keyof OrganizationData, string>> = {};

    if (!formData.nit) {
      newErrors.nit = t("Register.errors.nitRequired");
    } else if (!/^\d+$/.test(formData.nit)) {
      newErrors.nit = t("Register.errors.nitInvalid");
    }

    if (!formData.name) {
      newErrors.name = t("Register.errors.nameRequired");
    } else if (formData.name.length < 2) {
      newErrors.name = t("Register.errors.nameTooShort");
    }

    // tel es opcional
    if (formData.tel && !/^\d{7,15}$/.test(formData.tel)) {
      newErrors.tel = t("Register.errors.telInvalid");
    }

    if (!formData.phone) {
      newErrors.phone = t("Register.errors.phoneRequired");
    } else if (!/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = t("Register.errors.phoneInvalid");
    }

    if (!formData.password) {
      newErrors.password = t("Register.errors.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = t("Register.errors.passwordTooShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof OrganizationData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage(t("Register.errors.formInvalid"));
      setSuccessMessage(null);
      return;
    }

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
        <div>
          <Input
            type="text"
            name="nit"
            placeholder="NIT*"
            value={formData.nit}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.nit && (
            <p className="text-red-500 text-xs mt-1">{errors.nit}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Organización*"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="tel"
            placeholder="Teléfono"
            value={formData.tel}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.tel && (
            <p className="text-red-500 text-xs mt-1">{errors.tel}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="phone"
            placeholder="Celular*"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña*"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
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