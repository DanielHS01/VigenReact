import { ReactNode, useState } from "react";
import OrganizationForm from "@/auth/components/Signups/OrganizationForm";
import Button from "@/shared/ui/Button";
import HeadquartersForm from "@/auth/components/Signups/HeadquartersForm";
import { useTranslation } from "react-i18next";

interface steps {
  title: string;
  component: ReactNode;
}
const OrganizationSignup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const STEPS: steps[] = [
    {
      title: t("Steppers.Organization"),
      component: <OrganizationForm />,
    },
    {
      title: t("Steppers.Headquarters"),
      component: <HeadquartersForm />,
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    console.log(currentStep);
  };

  // Handle the previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    console.log(currentStep);
  };
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="flex justify-center mb-8 space-x-5 md:space-x-10">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer ${
              index === currentStep
                ? "text-cyan-500"
                : "text-gray-500 dark:text-gray-300"
            }`}
            onClick={() => setCurrentStep(index)}
          >
            <span className="font-bold mr-2 hidden md:flex">{index + 1}.</span>
            <span>{step.title}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        {STEPS[currentStep].component}
      </div>
      <div>
        <div className="flex justify-end mt-8 space-x-5">
          {currentStep > 0 && (
            <Button type="button" variant="secondary" onClick={handlePrevious}>
              {t("Steppers.Previous")}
            </Button>
          )}
          {currentStep < STEPS.length - 1 && (
            <Button type="button" onClick={handleNext}>
              {t("Steppers.Next")}
            </Button>
          )}
          {currentStep === STEPS.length - 1 && (
            <Button type="submit">{t("Steppers.Submit")}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignup;
