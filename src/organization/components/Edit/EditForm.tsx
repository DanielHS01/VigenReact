import BasicInformation from "@/organization/components/Edit/BasicInformation";
import Password from "@/organization/components/Edit/Password";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import {
  getOrganizationById,
  updateOrganization,
  OrganizationData,
  getHeadquarters,
  HeadquartersData,
} from "@/auth/services/authServices";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HeadquartersTable from "@/organization/components/Edit/HeadquartersTable";

const EditForm = () => {
  const { t } = useTranslation();
  const [organization, setOrganization] = useState<OrganizationData>({
    nit: "",
    name: "",
    tel: "",
    phone: "",
    password: "",
    organizationTypeId: 0,
    newPassword: "",
  });
  const [headquarters, setHeadquarters] = useState<HeadquartersData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      const rawCookie = Cookies.get("userData");
      const orgId = rawCookie
        ? JSON.parse(decodeURIComponent(rawCookie)).nit
        : null;
      if (orgId) {
        try {
          const data = await getOrganizationById(orgId);
          setOrganization(data);
        } catch (error) {
          console.error("Error al obtener la organización", error);
        } finally {
          setLoading(false);
        }
      }

      if (orgId) {
        try {
          const data = await getOrganizationById(orgId);
          setOrganization(data);

          // Obtener sedes
          const hqData = await getHeadquarters(orgId);
          setHeadquarters(hqData);
        } catch (error) {
          console.error("Error al obtener la organización o las sedes", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrganization();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setOrganization((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawCookie = Cookies.get("userData");
    const orgId = rawCookie
      ? JSON.parse(decodeURIComponent(rawCookie)).nit
      : null;
    if (orgId) {
      try {
        await updateOrganization(orgId, organization);
        alert("Organización actualizada correctamente");
      } catch (error) {
        alert("Error al actualizar la organización");
        console.error(error);
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <>
      <h2 className="text-center mt-5 text-3xl font-semibold text-cyan-950 dark:text-cyan-50">
        {t("EditInfo.title")}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-col justify-center md:justify-evenly items-center space-y-10 md:space-y-0 py-10"
      >
        <div className="flex space-x-10">
          <div>
            <BasicInformation values={organization} onChange={handleChange} />
          </div>
          <div className="flex flex-col justify-center items-center space-y-10">
            <Password values={organization} onChange={handleChange} />
            <Button type="submit" variant="primary">
              {t("EditInfo.save")}
            </Button>
          </div>
        </div>
        <div className="w-full px-4 md:w-1/2">
          <h3 className="text-xl font-semibold mt-4 text-cyan-900 dark:text-cyan-50">
            {t("EditInfo.headquarters")}
          </h3>
          <HeadquartersTable headquarters={headquarters} />
        </div>
      </form>
    </>
  );
};

export default EditForm;
