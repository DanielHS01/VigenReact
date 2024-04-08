import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const FormContainer: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className="bg-cyan-950 flex rounded-xl justify-center p-4 w-96">
      <div
        className={`bg-black bg-opacity-50 flex flex-col rounded-xl text-white justify-center p-4 w-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
