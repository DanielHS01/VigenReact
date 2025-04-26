import React, { useEffect } from "react";

interface PrivacyAgreementProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeButtonText?: string;
}

const PrivacyAgreement: React.FC<PrivacyAgreementProps> = ({
  isOpen,
  onClose,
  title = "Acuerdo de Privacidad",
  closeButtonText = "Cerrar",
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Contenido del acuerdo de privacidad definido directamente aquí
  const privacyContent = (
    <div>
      <p>
        Nos comprometemos a proteger su privacidad y a garantizar la seguridad
        de sus datos personales. La información que usted proporciona será
        utilizada únicamente para los fines establecidos en nuestros servicios,
        como procesar su registro, mejorar su experiencia de usuario y cumplir
        con las obligaciones legales. No compartiremos sus datos con terceros
        sin su consentimiento expreso, salvo en los casos requeridos por la ley.
        Al utilizar nuestros servicios, usted acepta los términos descritos en
        esta política de privacidad.
      </p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-cyan-50 rounded-lg shadow-lg w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 p-4 m-9 sm:p-6 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl text-cyan-950 font-bold mb-4">{title}</h2>
        <div className="text-xs sm:text-sm text-gray-700 mb-6">{privacyContent}</div>
        <div className="flex justify-end">
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-950 text-white rounded hover:bg-cyan-700 transition-colors"
            onClick={onClose}
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAgreement;