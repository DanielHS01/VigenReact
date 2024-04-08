import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}) => {
  const buttonVariant = () => {
    switch (variant) {
      case "primary":
        return "bg-cyan-950 hover:bg-cyan-600 text-white";
      case "secondary":
        return "bg-transparent border border-cyan-950 hover:bg-cyan-950 hover:text-white";
      case "outline":
        return "bg-transparent border border-white hover:bg-white hover:text-cyan-950";
    }
  };
  return (
    <button
      onClick={onClick}
      className={`px-6 py-1 rounded-md transition-colors duration-300 ${buttonVariant()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
