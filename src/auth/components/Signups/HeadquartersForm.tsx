import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import Table from "@/shared/ui/Table";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  HeadquartersData,
  registerHeadquarters,
} from "@/auth/services/authServices";
import OrganizationMap from "../Maps/OrganizationMap";
import { useNavigate, useLocation } from "react-router-dom";

const HeadquartersForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nitFromUrl = queryParams.get("nit") || "";
  const [formData, setFormData] = useState<HeadquartersData>({
    id: "",
    nit: nitFromUrl,
    ubication: "",
    range: 1000,
    countryCode: "+57",
    phone: "",
    tel: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof HeadquartersData, string>>
  >({});
  const [headquartersList, setHeadquartersList] = useState<HeadquartersData[]>(
    []
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validación para un campo específico (en onBlur)
  const validateField = (name: keyof HeadquartersData, value: string) => {
    const newErrors: Partial<Record<keyof HeadquartersData, string>> = {
      ...errors,
    };

    switch (name) {
      case "nit": {
        if (value && !/^\d+$/.test(value)) {
          newErrors.nit = t("Register.errors.nitInvalid");
        } else {
          delete newErrors.nit;
        }
        break;
      }
      case "ubication": {
        if (value && !/^-?\d+\.\d+,\s-?\d+\.\d+$/.test(value)) {
          newErrors.ubication = t("Register.errors.locationInvalid");
        } else {
          delete newErrors.ubication;
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
      case "tel": {
        if (value && !/^\d{7,15}$/.test(value)) {
          newErrors.tel = t("Register.errors.telInvalid");
        } else {
          delete newErrors.tel;
        }
        break;
      }
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validación completa para agregar una sede o enviar el formulario
  const validateForm = () => {
    const newErrors: Partial<Record<keyof HeadquartersData, string>> = {};

    if (!formData.nit) {
      newErrors.nit = t("Register.errors.nitRequired");
    } else if (!/^\d+$/.test(formData.nit)) {
      newErrors.nit = t("Register.errors.nitInvalid");
    }

    if (!formData.ubication) {
      newErrors.ubication = t("Register.errors.locationRequired");
    } else if (!/^-?\d+\.\d+,\s-?\d+\.\d+$/.test(formData.ubication)) {
      newErrors.ubication = t("Register.errors.locationInvalid");
    }

    if (!formData.countryCode) {
      newErrors.countryCode = t("Register.errors.countryCodeRequired");
    } else if (!/^\+\d{1,3}$/.test(formData.countryCode)) {
      newErrors.countryCode = t("Register.errors.countryCodeInvalid");
    }

    if (!formData.phone) {
      newErrors.phone = t("Register.errors.phoneRequired");
    } else if (!/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = t("Register.errors.phoneInvalid");
    }

    // tel es opcional
    if (formData.tel && !/^\d{7,15}$/.test(formData.tel)) {
      newErrors.tel = t("Register.errors.telInvalid");
    }

    if (formData.range <= 0) {
      newErrors.range = t("Register.errors.rangeInvalid");
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
    validateField(name as keyof HeadquartersData, value);
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    const locationString = `${location.lat}, ${location.lng}`;
    setFormData((prev) => ({ ...prev, ubication: locationString }));
    validateField("ubication", locationString); // Validar la ubicación al seleccionarla
  };

  const handleAddHeadquarter = () => {
    if (!validateForm()) {
      setErrorMessage(t("Register.errors.formInvalid"));
      setSuccessMessage(null);
      return;
    }

    setHeadquartersList([
      ...headquartersList,
      { ...formData, id: String(Date.now()) },
    ]);
    setFormData({
      ...formData,
      nit: nitFromUrl,
      ubication: "",
      phone: "",
      tel: "",
      countryCode: "+57", // Restablecer a valor por defecto
    });
    setErrors({});
    setErrorMessage(null);
  };

  const handleRegisterHeadquarters = async (e: React.FormEvent) => {
    e.preventDefault();

    if (headquartersList.length === 0) {
      setErrorMessage(t("Register.errors.noHeadquarters"));
      setSuccessMessage(null);
      return;
    }

    try {
      for (const headquarter of headquartersList) {
        await registerHeadquarters(headquarter);
      }
      setSuccessMessage(t("Register.success"));
      setErrorMessage(null);
      setHeadquartersList([]);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error registering headquarters:", error);
      setSuccessMessage(null);
      setErrorMessage(t("Register.error"));
    }
  };

  const handleDeleteHeadquarter = (id: string) => {
    setHeadquartersList(headquartersList.filter((hq) => hq.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center md:flex-row md:justify-evenly space-y-5 md:space-y-0">
      <div className="flex flex-col items-center justify-center order-last md:order-first space-y-5 mt-5 md:mt-0">
        <div className="w-80 md:w-full h-64 md:h-96">
          <OrganizationMap onLocationSelect={handleLocationSelect} />
        </div>
        <Table className="w-96 md:mx-0">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th>#</th>
              <th>NIT</th>
              <th>{t("Register.location")}</th>
              <th>{t("Register.tel")}</th>
              <th>{t("Register.cellphone")}</th>
              <th>{t("Register.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {headquartersList.map((hq, index) => (
              <tr key={hq.id}>
                <td>{index + 1}</td>
                <td>{hq.nit}</td>
                <td>{hq.ubication}</td>
                <td>{hq.tel}</td>
                <td>{hq.phone}</td>
                <td>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteHeadquarter(hq.id)}
                  >
                    {t("Register.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <FormContainer>
        <p
          className="text-center text-xs font-semibold lg:text-sm

 uppercase mt-3 mb-5"
        >
          {t("Register.headquarters")}
        </p>
        <form onSubmit={handleRegisterHeadquarters} className="space-y-5">
          <div>
            <Input
              type="text"
              name="ubication"
              placeholder={t("Register.location") + "*"}
              value={formData.ubication}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.ubication && (
              <p className="text-red-500 text-xs mt-1">{errors.ubication}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              name="phone"
              placeholder={t("Register.cellphone") + "*"}
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
              type="text"
              name="tel"
              placeholder={t("Register.tel")}
              value={formData.tel}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.tel && (
              <p className="text-red-500 text-xs mt-1">{errors.tel}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <Button type="button" onClick={handleAddHeadquarter}>
              {t("Register.add")}
            </Button>
            <Button type="submit">{t("Register.registerHeadquarters")}</Button>
          </div>
          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
        </form>
      </FormContainer>
    </div>
  );
};

export default HeadquartersForm;
