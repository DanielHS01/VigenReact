import FormContainer from "@/shared/ui/FormContainer";
import Input from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";
import UsersMap from "@/auth/components/Maps/UsersMap";

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
    <FormContainer className="space-y-6 p-6 shadow-md rounded-lg">
      <p className="text-center text-xl font-semibold">
        {t("EditInfo.contact")}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.email")}</label>
          <Input
            value={formData.email}
            placeholder={t("EditInfo.email")}
            onChange={(e) => onInputChange("email", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.occupation")}</label>
          <Input
            value={formData.occupation}
            placeholder={t("EditInfo.occupation")}
            onChange={(e) => onInputChange("occupation", e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/4">
            <label className="text-sm font-medium">{t("EditInfo.country_code")}</label>
            <Input
              value={formData.countryCode}
              placeholder={t("EditInfo.country_code")}
              onChange={(e) => onInputChange("countryCode", e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-3/4">
            <label className="text-sm font-medium">{t("EditInfo.phone")}</label>
            <Input
              value={formData.phone}
              placeholder={t("EditInfo.phone")}
              onChange={(e) => onInputChange("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">{t("EditInfo.postal_code")}</label>
          <Input
            value={formData.postalCode}
            placeholder={t("EditInfo.postal_code")}
            onChange={(e) => onInputChange("postalCode", e.target.value)}
          />
        </div>
        <div className="flex flex-col h-[300px]">
          <label className="text-sm font-medium">{t("EditInfo.location")}</label>
          <UsersMap
            onLocationSelect={(location) =>
              onInputChange("ubication", `${location.lat},${location.lng}`)
            }
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default ContactInformation;