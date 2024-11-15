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
import { useNavigate } from "react-router-dom";

const HeadquartersForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<HeadquartersData>({
    id: "",
    nit: "",
    ubication: "",
    range: 1000,
    countryCode: "+57",
    phone: "",
    tel: "",
  });
  const [headquartersList, setHeadquartersList] = useState<HeadquartersData[]>(
    []
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddHeadquarter = () => {
    setHeadquartersList([
      ...headquartersList,
      { ...formData, id: String(Date.now()) },
    ]);
    setFormData({ ...formData, ubication: "", phone: "", tel: "" });
  };

  const handleRegisterHeadquarters = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <OrganizationMap />
        <Table className="w-96 md:mx-0">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th>#</th>
              <th>NIT</th>
              <th>Ubicación</th>
              <th>Teléfono</th>
              <th>Celular</th>
              <th>Acciones</th>
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
        <p className="text-center text-xs font-semibold lg:text-sm uppercase mt-3 mb-5">
          {t("Register.headquarters")}
        </p>
        <form onSubmit={handleRegisterHeadquarters} className="space-y-5">
          <Input
            type="text"
            name="nit"
            placeholder="NIT"
            value={formData.nit}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="ubication"
            placeholder="Ubicación"
            value={formData.ubication}
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
            type="text"
            name="tel"
            placeholder="Teléfono"
            value={formData.tel}
            onChange={handleChange}
          />
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
