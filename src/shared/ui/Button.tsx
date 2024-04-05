import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-1 bg-cyan-950 hover:bg-cyan-700 text-white rounded-md transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
