import { IoAlertCircle } from "react-icons/io5";

const Emergency = () => {
  return (
    <button className="fixed bottom-6 left-6 hover:scale-110 transition-all duration-500 z-20">
      <IoAlertCircle size={80} className="text-red-600" />
    </button>
  );
};

export default Emergency;
