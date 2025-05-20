import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import fotico from "@/assets/AboutPicture.png";
import Sebas from "@/assets/Sebas.png";

interface Slide {
  nameKey: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
}

const slides: Slide[] = [
  {
    nameKey: "team.sebastian.name",
    titleKey: "team.sebastian.title",
    descriptionKey: "team.sebastian.description",
    image: Sebas,
  },
  {
    nameKey: "team.daniel.name",
    titleKey: "team.daniel.title",
    descriptionKey: "team.daniel.description",
    image: fotico,
  },
];

const OurTeam: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isLast = currentIndex === slides.length - 1;

  const handleClick = (): void => {
    if (isLast) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  const { nameKey, titleKey, descriptionKey, image } = slides[currentIndex];

  return (
    <section className="bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50 p-8">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">
        {t("team.title")}
      </h1>
      <div className="flex flex-col md:flex-row max-w-3xl mx-auto items-center space-y-6 md:space-y-0 md:space-x-6">
        {/* Imagen y nombre */}
        <div className="w-full md:w-96 flex flex-col items-center">
          <img
            src={image}
            alt={t(nameKey)}
            className="w-full h-full md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Info y flecha */}
        <div className="w-full md:w-1/2 relative">
          <h2 className="text-xl md:text-2xl font-semibold text-left mb-1">
            {t(nameKey)}
          </h2>
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            {t(titleKey)}
          </h3>
          <p className="text-sm md:text-base leading-relaxed mb-12">
            {t(descriptionKey)}
          </p>
          <button
            onClick={handleClick}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-3 hover:scale-125 focus:outline-none"
            aria-label={t(isLast ? "team.previous" : "team.next")}
          >
            {isLast ? (
              <FaChevronLeft size={24} />
            ) : (
              <FaChevronRight size={24} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;