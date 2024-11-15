import React, { useState } from "react";
import { sendAlert, AlertData } from "@/user/services/alertService";
import Cookies from "js-cookie";
import Button from "@/shared/ui/Button";
import { IoCloseOutline } from "react-icons/io5";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // src/components/EmergencyModal.tsx

  const formatDate = (): string => {
    return new Date().toISOString();
  };

  const handleSubmit = async () => {
    const rawCookie = Cookies.get("userData");
    const userId = rawCookie
      ? JSON.parse(decodeURIComponent(rawCookie)).identification
      : null;
    if (!userId) {
      setError("No se encontró el ID de usuario en las cookies");
      return;
    }

    const payload: AlertData = {
      userId,
      title,
      stateId: 0,
      description,
      organizationTypeId: 1,
      date: formatDate(), // Fecha actual en formato ISO
    };

    try {
      setIsSubmitting(true);
      setError(null);
      await sendAlert(payload);
      onClose(); // Cierra el modal tras el envío
    } catch {
      setError("No se pudo enviar la alerta, intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 text-cyan-950">
      <div className="bg-cyan-50 px-10 py-6 rounded-lg shadow-lg w-[30rem]">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoCloseOutline size={30} />
          </button>
        </div>
        <h2 className="text-xl mb-4 text-center font-bold">
          ¿Necesitas ayuda inmediata?
        </h2>
        <p className="text-center text-xs mb-5">
          Si te encuentras en una situación de emergencia, puedes utilizar este
          botón de pánico para enviar una alerta rápida y confidencial a las
          autoridades o a un contacto de confianza. Esta acción te ayudará a
          recibir ayuda en el menor tiempo posible. Recuerda mantener la calma
          y, si es seguro hacerlo, busca un lugar seguro mientras esperas
          asistencia.
        </p>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <textarea
          placeholder="Descripción breve"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          rows={3}
        ></textarea>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex justify-center">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Alerta"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
