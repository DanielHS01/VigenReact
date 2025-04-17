import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import fotico from "@/assets/AboutPicture.png";
import Sebas from "@/assets/Sebas.png";

interface Slide {
  name: string;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    name: "Sebastian Palacio",
    title: "Ingeniero de Sistemas",
    description:
      "Sebastian es un estudiante de Ingeniería de Sistemas enfocado en el desarrollo de software y la innovación tecnológica. Actualmente se encuentra en las etapas finales de su carrera, participando en proyectos académicos que fortalecen sus habilidades técnicas y de trabajo en equipo.",
    image: Sebas,
  },
  {
    name: "Daniel Hernandez",
    title: "Ingeniero de Sistemas",
    description:
      "Daniel cursa los últimos semestres de Ingeniería de Sistemas, con un interés particular en la ciberseguridad y las redes informáticas. Ha contribuido en iniciativas universitarias que promueven el aprendizaje colaborativo y la aplicación práctica del conocimiento adquirido.",
    image: fotico,
  },
];

const OurTeam: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isLast = currentIndex === slides.length - 1;

  const handleClick = (): void => {
    if (isLast) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  const { name, title, description, image } = slides[currentIndex];

  return (
    <section className="bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50 p-8">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">
        Sobre el Equipo
      </h1>
      <div className="flex flex-col md:flex-row  max-w-3xl mx-auto items-center space-y-6 md:space-y-0 md:space-x-6">
        {/* Imagen y nombre */}
        <div className="w-full md:w-96 flex flex-col items-center">
          <img
            src={image}
            alt={name}
            className="w-full h-full md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Info y flecha */}
        <div className="w-full md:w-1/2 relative">
          <h2 className="text-xl md:text-2xl font-semibold text-left mb-1">
            {name}
          </h2>
          <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm md:text-base leading-relaxed mb-12">
            {description}
          </p>
          <button
            onClick={handleClick}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-3 hover:scale-125 focus:outline-none"
            aria-label={isLast ? "Anterior" : "Siguiente"}
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
