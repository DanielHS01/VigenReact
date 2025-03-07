import { register, RegisterData } from "@/auth/services/authServices";
import Button from "@/shared/ui/Button";
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  const generateSecureCode = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return ((array[0] % 9000) + 1000).toString(); // Asegurar que esté en el rango 1000-9999
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (location) {
      const randomCode = generateSecureCode(); // Código generado de forma segura

      const dataToSend: RegisterData = {
        ...formData,
        ubication: `${location.lat}, ${location.lng}`,
        Code: randomCode,
        CountryCode: formData.country_code,
        PostalCode: formData.postal_code,
        MaritalStatus: formData.marital_status,
      };

      console.log("Datos que se envían:", dataToSend);

      try {
        await register(dataToSend);
        setSuccessMessage(t("Register.success"));
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setErrorMessage(t("Register.error"));
      }
    } else {
      console.log("Debe seleccionar una ubicación");
    }
  };

  return (
    <FormContainer className="space-y-5">
      <p className="text-center text-xs font-semibold lg:text-sm uppercase">
        {t("Register.title")}
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="identification"
          type="text"
          placeholder="Identificación"
          onChange={handleChange}
        />
        <Input
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <Input
          name="email"
          type="text"
          placeholder="Correo"
          onChange={handleChange}
        />
        <Input
          name="gender"
          type="text"
          placeholder="Género"
          onChange={handleChange}
        />
        <div className="flex space-x-5">
          <Input
            name="country_code"
            type="text"
            placeholder="Indicativo"
            onChange={handleChange}
          />
          <Input
            name="phone"
            type="text"
            placeholder="Celular"
            onChange={handleChange}
          />
        </div>
        <Input name="birthdate" type="date" onChange={handleChange} />
        <Input
          name="occupation"
          type="text"
          placeholder="Ocupación"
          onChange={handleChange}
        />
        <div className="flex space-x-5">
          <Input
            name="postal_code"
            type="text"
            placeholder="Código Postal"
            onChange={handleChange}
          />
          <Input
            name="marital_status"
            type="text"
            placeholder="Estado Civil"
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-5">
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar Contraseña"
            onChange={handleChange}
          />
        </div>
        <p className="text-xs font-thin cursor-pointer hover:text-gray-200 transition-colors hover:underline underline-offset-2">
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
    </FormContainer>
  );
};

export default UserForm;
