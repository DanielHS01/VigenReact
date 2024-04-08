import Button from "@/shared/ui/Button";
import { useEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa6";
import Spanish from "@/assets/flag-for-spain-svgrepo-com.svg";
import English from "@/assets/united-states-of-america-united-states-svgrepo-com.svg";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [dropdownRef]);

  return (
    <div className="justify-self-center col-span-2">
      <div className="flex justify-center" ref={dropdownRef}>
        <Button variant="secondary" onClick={() => toggleDropdown()}>
          <FaGlobe />
        </Button>
      </div>
      {isOpen && (
        <div className="flex flex-col md:absolute mt-2 w-32 rounded-md shadow-lg bg-cyan-950 text-white animate-fade-down">
          <Button className="flex items-center space-x-3">
            <img src={Spanish} width="16px" alt="" />
            <p>Español</p>
          </Button>
          <Button className="flex items-center space-x-3">
            <img src={English} width="16px" alt="" />
            <p>Inglés</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
