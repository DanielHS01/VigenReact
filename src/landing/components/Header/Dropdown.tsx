import Button from "@/shared/ui/Button";
import { useEffect, useRef, useState } from "react";
import { FaGlobe, FaAngleDown } from "react-icons/fa6";
import Spanish from "@/assets/flag-for-spain-svgrepo-com.svg";
import English from "@/assets/united-states-of-america-united-states-svgrepo-com.svg";
import { useTranslation } from "react-i18next";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null); // Referencia para el menú

  const languages = [
    { code: "es", lang: t("Languages.spanish"), img: Spanish },
    { code: "en", lang: t("Languages.english"), img: English },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // useEffect para agregar el evento de clic cuando el menú esté abierto
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpieza del evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="justify-self-center col-span-2" ref={menuRef}>
      <div className="flex justify-center">
        <button
          onClick={toggleDropdown}
          className="flex space-x-0.5 hover:scale-110"
        >
          <FaGlobe />
          <FaAngleDown />
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col md:absolute mt-5 w-32 rounded-md shadow-lg bg-cyan-950 text-cyan-50 animate-fade-down dark:bg-cyan-50 dark:text-cyan-950">
          {languages.map((lng) => (
            <Button
              className="flex items-center space-x-3"
              key={lng.code}
              onClick={() => handleLanguageChange(lng.code)}
            >
              <img src={lng.img} width="16px" alt="" />
              <p>{lng.lang}</p>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
