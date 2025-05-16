import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";
import UsersMap from "@/auth/components/Maps/UsersMap"; // Asegúrate de que esta ruta sea correcta

interface ContactInformationProps {
  formData: {
    email: string;
    occupation: string;
    countryCode: string;
    phone: string;
    postalCode: string;
    ubication: string;
  };
  onInputChange: (name: string, value: string) => void;
}

const ContactInformation = ({
  formData,
  onInputChange,
}: ContactInformationProps) => {
  const { t } = useTranslation();

  return (
    <FormContainer className="space-y-5 px-10">
      <p className="text-center">{t("EditInfo.contact")}</p>
      <div className="flex flex-col">
        <label>{t("EditInfo.email")}</label>
        <Input
          value={formData.email}
          placeholder={t("EditInfo.email")}
          onChange={(e) => onInputChange("email", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.occupation")}</label>
        <Input
          value={formData.occupation}
          placeholder={t("EditInfo.occupation")}
          onChange={(e) => onInputChange("occupation", e.target.value)}
        />
      </div>
      <div className="flex space-x-3">
        <div className="flex flex-col">
          <label>{t("EditInfo.country_code")}</label>
          <Input
            value={formData.countryCode}
            placeholder={t("EditInfo.country_code")}
            onChange={(e) => onInputChange("countryCode", e.target.value)}
            className="w-16"
          />
        </div>
        <div className="flex flex-col">
          <label>{t("EditInfo.phone")}</label>
          <Input
            value={formData.phone}
            placeholder={t("EditInfo.phone")}
            onChange={(e) => onInputChange("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label>{t("EditInfo.postal_code")}</label>
        <Input
          value={formData.postalCode}
          placeholder={t("EditInfo.postal_code")}
          onChange={(e) => onInputChange("postalCode", e.target.value)}
        />
      </div>

      {/* Mapa en lugar del input de ubicación */}
      <div className="flex flex-col h-[300px]">
        <label>{t("EditInfo.location")}</label>
        <UsersMap
          onLocationSelect={(location) =>
            onInputChange("ubication", `${location.lat},${location.lng}`)
          }
        />
      </div>
    </FormContainer>
  );
};

export default ContactInformation;
