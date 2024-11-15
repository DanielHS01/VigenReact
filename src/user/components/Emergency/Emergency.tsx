import { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import EmergencyModal from "./EmergencyModal";

const Emergency: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 left-6 hover:scale-110 transition-all duration-500 z-20"
      >
        <IoAlertCircle size={80} className="text-red-600" />
      </button>

      <EmergencyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </>
  );
};

export default Emergency;
