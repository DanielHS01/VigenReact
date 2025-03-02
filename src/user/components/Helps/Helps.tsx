// Helps.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FaPhoneVolume, FaTruckMedical, FaRegFileLines } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Modal from "@/user/components/Helps/Modal"; // Importa el componente Modal

interface HelpCards {
  icon: IconType;
  title: string;
  navigateTo?: string;
  onClick?: () => void;
}

const Helps = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // Funciones para abrir el modal con contenido específico
  const openPhoneModal = () => {
    setModalContent(
      <div className="text-sm">
        <h3 className="mb-5">
          Estas líneas están diseñadas para brindar asesoría y apoyo inmediato a
          víctimas de violencia
        </h3>
        <ul className="list-disc">
          <li>Línea Nacional: 155</li>
          <li>Policía Nacional: 123</li>
          <li>Línea de Bienestar Familiar: 141</li>
          <li>Fiscalía General de la Nación: 122</li>
        </ul>
      </div>
    );
    setShowModal(true);
  };

  const openCareEntitiesModal = () => {
    setModalContent(
      <div className="text-sm">
        <h3 className="mb-5">
          Entidades encargadas de dar asesoría y apoyo inmediato en Facatativá
        </h3>
        <ul className="list-disc">
          <li>Instituto Colombiano de Bienestar Familiar</li>
          <li>Defensoría del Pueblo</li>
          <li>Fiscalía General de la Nación</li>
          <li>Casa de la Mujer</li>
        </ul>
      </div>
    );
    setShowModal(true);
  };

  const HELP_CARDS: HelpCards[] = [
    {
      icon: FaPhoneVolume,
      title: t("HomeUser.phone"),
      onClick: openPhoneModal,
    },
    {
      icon: FaRegFileLines,
      title: t("HomeUser.poll"),
      navigateTo: "/Poll",
    },
    {
      icon: FaTruckMedical,
      title: t("HomeUser.care"),
      onClick: openCareEntitiesModal,
    },
  ];

  return (
    <div className="bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50">
      <div className="w-full relative bottom-16 flex flex-col md:flex-row items-center justify-around space-y-10 md:space-y-0 px-10 py-28 bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50">
        {HELP_CARDS.map((item) => (
          <button
            key={item.title}
            onClick={() =>
              item.navigateTo ? navigate(item.navigateTo) : item.onClick?.()
            }
            className="w-64 h-32 md:w-80 md:h-40 rounded-xl bg-indigo-100 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-50 p-2 shadow-2xl dark:shadow-lg dark:shadow-customCyan flex flex-col justify-center items-center space-y-2 hover:scale-110 transition-all duration-300"
          >
            <item.icon size={35} />
            <h3 className="text-2xl font-semibold">{item.title}</h3>
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        content={modalContent}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Helps;
