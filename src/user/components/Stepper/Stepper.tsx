import { ReactNode, useState } from "react";
import Button from "@/shared/ui/Button";
import FirstPersonalInfo from "@/user/components/Stepper/FirstPersonalInfo";
import SecondPersonalInfo from "@/user/components/Stepper/SecondPersonalInfo";
import Questions from "@/user/components/Stepper/Questions";
import { useTranslation } from "react-i18next";

interface Step {
  title: string;
  component: ReactNode;
}

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const STEPS: Step[] = [
    {
      title: t("Steppers.PersonalInfo1"),
      component: <FirstPersonalInfo />,
    },
    {
      title: t("Steppers.PersonalInfo2"),
      component: <SecondPersonalInfo />,
    },
    {
      title: t("Steppers.Questions"),
      component: <Questions />,
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
    <form className="max-w-2xl mx-auto mt-8 flex flex-col items-center justify-center my-5">
      <div className="flex justify-center mb-8 space-x-5 md:space-x-10">
        {STEPS.map((step, index) => (
          <button
            key={step.title}
            className={`flex items-center cursor-pointer ${
              index === currentStep
                ? "text-cyan-500"
                : "text-gray-500 dark:text-gray-300"
            }`}
            onClick={() => setCurrentStep(index)}
          >
            <span className="font-bold mr-2 hidden md:flex">{index + 1}.</span>
            <span>{step.title}</span>
          </button>
        ))}
      </div>
      <div>{STEPS[currentStep].component}</div>
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
    </form>
  );
};

export default Stepper;
