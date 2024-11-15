// Modal.tsx
import Button from "@/shared/ui/Button";
import React from "react";
import { IoCallOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-cyan-50 dark:bg-gray-800 rounded-xl w-80 md:w-[32rem] flex overflow-hidden">
        <div className="bg-cyan-950 flex justify-center items-center w-44 h-auto text-cyan-50">
          <IoCallOutline size={50} />
        </div>
        <div className="flex flex-col justify-center items-center text-center m-5">
          <h3 className="text-xl font-semibold mb-4">Información</h3>
          <div className="text-start ms-3">{content}</div>
          <Button onClick={onClose} variant="primary" className="mt-10">
            Ok, ¡Gracias!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
