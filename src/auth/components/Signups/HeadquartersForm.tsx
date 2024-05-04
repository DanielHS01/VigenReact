import Button from "@/shared/ui/Button";
import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import Table from "@/shared/ui/Table";
import { useTranslation } from "react-i18next";
import "@/auth/components/Maps/OrganizationMap.css";
import OrganizationMap from "../Maps/OrganizationMap";

const HeadquartersForm = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center justify-center md:flex-row md:justify-evenly space-y-5 md:space-y-0">
      <div className="flex flex-col items-center justify-center order-last md:order-first space-y-5 mt-5 md:mt-0">
        <OrganizationMap />
        <Table className="w-96 md:mx-0">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                Rango
              </th>
              <th scope="col" className="px-6 py-4">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-4">
                Celular
              </th>
              <th scope="col" className="px-6 py-4">
                Ubicación
              </th>
              <th scope="col" className="px-6 py-4">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200 dark:border-white/10">
              <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
              <td className="whitespace-nowrap px-6 py-4">2</td>
              <td className="whitespace-nowrap px-6 py-4">1000</td>
              <td className="whitespace-nowrap px-6 py-4">8425558</td>
              <td className="whitespace-nowrap px-6 py-4">3008441389</td>
              <td className="whitespace-nowrap px-6 py-4">Facatativá</td>
              <td className="whitespace-nowrap px-6 py-4">Eliminar</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <FormContainer>
        <p className="text-center text-xs font-semibold lg:text-sm uppercase mt-3 mb-5">
          {t("Register.headquarters")}
        </p>
        <form action="" className="space-y-5">
          <Input type="text" placeholder="NIT" />
          <Input type="text" placeholder="Organización" />
          <Input type="text" placeholder="Teléfono" />
          <div className="flex space-x-5">
            <Input type="text" placeholder="Indicativo" />
            <Input type="text" placeholder="Celular" />
          </div>
          <div className="flex space-x-5">
            <Input type="text" placeholder="Contraseña" />
            <Input type="text" placeholder="Confirmar Contraseña" />
          </div>
          <p className="text-xs font-thin cursor-pointer hover:text-gray-200 transition-colors hover:underline underline-offset-2">
            {t("Register.privacy")}
          </p>
          <div className="flex justify-center space-x-3">
            <Button variant="outline">{t("Register.add")}</Button>
            <Button variant="outline">{t("Register.button")}</Button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default HeadquartersForm;
