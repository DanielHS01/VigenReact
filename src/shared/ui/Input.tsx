interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  className = "",
  type = "",
  placeholder = "",
}) => {
  return (
    <input
      type={type}
      className={`text-black rounded-md h-8 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
