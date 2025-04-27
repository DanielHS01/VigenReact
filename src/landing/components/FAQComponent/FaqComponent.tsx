import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import faqImagen from "@/assets/ImagenFAQ.jpg";

interface FAQ {
  questionKey: string;
  answerKey: string;
}

const faqs: FAQ[] = [
  {
    questionKey: "faq.whatIsViolence",
    answerKey: "faq.whatIsViolenceAnswer",
  },
  {
    questionKey: "faq.commonViolenceTypes",
    answerKey: "faq.commonViolenceTypesAnswer",
  },
  {
    questionKey: "faq.violenceTriggers",
    answerKey: "faq.violenceTriggersAnswer",
  },
  {
    questionKey: "faq.preventViolence",
    answerKey: "faq.preventViolenceAnswer",
  },
  {
    questionKey: "faq.violencePreventionPrograms",
    answerKey: "faq.violencePreventionProgramsAnswer",
  },
  {
    questionKey: "faq.violenceAwarenessStrategies",
    answerKey: "faq.violenceAwarenessStrategiesAnswer",
  },
];

export default function FaqComponent(): JSX.Element {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-50 text-cyan-950 px-8 py-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="w-full h-64 sm:h-80 md:h-4/6">
        <img
          src={faqImagen}
          alt={t("faq.imageAlt")}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold uppercase mb-2">
          {t("faq.title")}
        </h1>
        <p className="text-sm italic mb-6 dark:text-cyan-50 text-cyan-950">
          {t("faq.description")}
        </p>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 dark:border-white py-4">
            <button
              className="flex justify-between items-center w-full text-left text-base sm:text-lg font-medium focus:outline-none"
              onClick={() => toggleDropdown(index)}
            >
              <span className="mr-2">{t(faq.questionKey)}</span>
              {openIndex === index ? (
                <FaChevronUp size={16} />
              ) : (
                <FaChevronDown size={16} />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-2 dark:text-cyan-50 text-cyan-950 text-sm leading-relaxed">
                {t(faq.answerKey)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}