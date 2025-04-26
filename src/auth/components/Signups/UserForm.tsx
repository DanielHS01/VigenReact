import { register, RegisterData } from "@/auth/services/authServices";
import Button from "@/shared/ui/Button";
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrivacyAgreement from "@/auth/components/Signups/PrivacyAgreement";

// Define las props que recibirá el formulario, incluida la ubicación
interface UserFormProps {
  location: { lat: number; lng: number } | null;
}

const UserForm = ({ location }: UserFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    identification: "",
    name: "",
    email: "",
    gender: "",
    country_code: "",
    phone: "",
    birthdate: "",
    occupation: "",
    postal_code: "",
    marital_status: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const maritalStatusOptions = [
    { value: "", label: "Estado civil*" },
    { value: "Soltero/a", label: "Soltero/a" },
    { value: "Casado/a", label: "Casado/a" },
    { value: "Viudo/a", label: "Viudo/a" },
    { value: "Divorciado/a", label: "Divorciado/a" },
    { value: "Separado/a", label: "Separado/a" },
    { value: "Unión Libre", label: "Unión Libre" },
  ];

  const generateSecureCode = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return ((array[0] % 9000) + 1000).toString(); // Asegurar que esté en el rango 1000-9999
  };

  // Función de validación para un campo específico
  const validateField = (name: keyof typeof formData, value: string) => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = { ...errors };

    switch (name) {
      case "identification": {
        if (value && !/^\d+$/.test(value)) {
          newErrors.identification = t("Register.errors.identificationInvalid");
        } else {
          delete newErrors.identification;
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
      case "email": {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = t("Register.errors.emailInvalid");
        } else {
          delete newErrors.email;
        }
        break;
      }
      case "gender": {
        if (value && !value) {
          newErrors.gender = t("Register.errors.genderRequired");
        } else {
          delete newErrors.gender;
        }
        break;
      }
      case "country_code": {
        if (value && !/^\+\d{1,3}$/.test(value)) {
          newErrors.country_code = t("Register.errors.countryCodeInvalid");
        } else {
          delete newErrors.country_code;
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
      case "birthdate": {
        if (value) {
          const today = new Date();
          const birthDate = new Date(value);
          if (birthDate >= today) {
            newErrors.birthdate = t("Register.errors.birthdateInvalid");
          } else {
            delete newErrors.birthdate;
          }
        } else {
          delete newErrors.birthdate;
        }
        break;
      }
      case "occupation": {
        if (value && !value) {
          newErrors.occupation = t("Register.errors.occupationRequired");
        } else {
          delete newErrors.occupation;
        }
        break;
      }
      case "postal_code": {
        if (value && !/^\d{4,10}$/.test(value)) {
          newErrors.postal_code = t("Register.errors.postalCodeInvalid");
        } else {
          delete newErrors.postal_code;
        }
        break;
      }
      case "marital_status": {
        if (value && !value) {
          newErrors.marital_status = t("Register.errors.maritalStatusRequired");
        } else {
          delete newErrors.marital_status;
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
      case "confirmPassword": {
        if (value && value !== formData.password) {
          newErrors.confirmPassword = t("Register.errors.confirmPasswordMismatch");
        } else {
          delete newErrors.confirmPassword;
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
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.identification) {
      newErrors.identification = t("Register.errors.identificationRequired");
    } else if (!/^\d+$/.test(formData.identification)) {
      newErrors.identification = t("Register.errors.identificationInvalid");
    }

    if (!formData.name) {
      newErrors.name = t("Register.errors.nameRequired");
    } else if (formData.name.length < 2) {
      newErrors.name = t("Register.errors.nameTooShort");
    }

    if (!formData.email) {
      newErrors.email = t("Register.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("Register.errors.emailInvalid");
    }

    if (!formData.gender) {
      newErrors.gender = t("Register.errors.genderRequired");
    }

    if (!formData.country_code) {
      newErrors.country_code = t("Register.errors.countryCodeRequired");
    } else if (!/^\+\d{1,3}$/.test(formData.country_code)) {
      newErrors.country_code = t("Register.errors.countryCodeInvalid");
    }

    if (!formData.phone) {
      newErrors.phone = t("Register.errors.phoneRequired");
    } else if (!/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = t("Register.errors.phoneInvalid");
    }

    if (!formData.birthdate) {
      newErrors.birthdate = t("Register.errors.birthdateRequired");
    } else {
      const today = new Date();
      const birthDate = new Date(formData.birthdate);
      if (birthDate >= today) {
        newErrors.birthdate = t("Register.errors.birthdateInvalid");
      }
    }

    if (!formData.occupation) {
      newErrors.occupation = t("Register.errors.occupationRequired");
    }

    // postal_code es opcional, solo validamos si tiene contenido
    if (formData.postal_code && !/^\d{4,10}$/.test(formData.postal_code)) {
      newErrors.postal_code = t("Register.errors.postalCodeInvalid");
    }

    if (!formData.marital_status) {
      newErrors.marital_status = t("Register.errors.maritalStatusRequired");
    }

    if (!formData.password) {
      newErrors.password = t("Register.errors.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = t("Register.errors.passwordTooShort");
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("Register.errors.confirmPasswordRequired");
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = t("Register.errors.confirmPasswordMismatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof formData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage(t("Register.errors.formInvalid"));
      return;
    }

    if (!location) {
      setErrorMessage(t("Register.errors.locationRequired"));
      return;
    }

    const randomCode = generateSecureCode();
    const birthdateWithTime = new Date(formData.birthdate).toISOString();

    const dataToSend: RegisterData = {
      ...formData,
      birthdate: birthdateWithTime,
      ubication: `${location.lat}, ${location.lng}`,
      Code: randomCode,
      CountryCode: formData.country_code,
      PostalCode: formData.postal_code,
      MaritalStatus: formData.marital_status,
    };

    try {
      await register(dataToSend);
      setSuccessMessage(t("Register.success"));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(t("Register.error"));
    }
  };

  return (
    <FormContainer>
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        {t("Register.title")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-white text-xs font-thin mt-2">
          Campos Obligatorios *
        </p>
        <div>
          <Input
            name="identification"
            type="text"
            placeholder="Identificación*"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.identification}
          />
          {errors.identification && (
            <p className="text-red-500 text-xs mt-1">{errors.identification}</p>
          )}
        </div>
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Nombre*"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.name}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Input
            name="email"
            type="text"
            placeholder="Correo*"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.email}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Input
            name="gender"
            type="text"
            placeholder="Género*"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.gender}
          />
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
        <div className="flex space-x-5">
          <div className="flex-1">
            <Input
              name="country_code"
              type="text"
              placeholder="Indicativo*"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.country_code}
            />
            {errors.country_code && (
              <p className="text-red-500 text-xs mt-1">{errors.country_code}</p>
            )}
          </div>
          <div className="flex-1">
            <Input
              name="phone"
              type="text"
              placeholder="Celular*"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.phone}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="birthdate" className="text-white text-xs font-thin">
            Fecha de Nacimiento*
          </label>
          <Input
            name="birthdate"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.birthdate}
          />
          {errors.birthdate && (
            <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>
          )}
        </div>
        <div>
          <Input
            name="occupation"
            type="text"
            placeholder="Ocupación*"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.occupation}
          />
          {errors.occupation && (
            <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
          )}
        </div>
        <div className="flex space-x-5">
          <div className="flex-1">
            <Input
              name="postal_code"
              type="text"
              placeholder="Código Postal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.postal_code}
            />
            {errors.postal_code && (
              <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>
            )}
          </div>
          <div className="flex-1">
            <select
              name="marital_status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.marital_status}
              className="w-full border border-gray-300 text-cyan-950 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {maritalStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.marital_status && (
              <p className="text-red-500 text-xs mt-1">{errors.marital_status}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="flex-1">
            <Input
              name="password"
              type="password"
              placeholder="Contraseña*"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.password}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex-1">
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Contraseña*"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <p
          className="text-xs font-thin cursor-pointer hover:text-gray-200 transition-colors hover:underline underline-offset-2"
          onClick={() => setIsPrivacyModalOpen(true)}
        >
          {t("Register.privacy")}
        </p>
        <div className="flex justify-center">
          <Button variant="outline" type="submit">
            {t("Register.button")}
          </Button>
        </div>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
      </form>

      <PrivacyAgreement
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title={t("Register.privacyTitle")}
        closeButtonText={t("Register.closeButton")}
      />
    </FormContainer>
  );
};

export default UserForm;