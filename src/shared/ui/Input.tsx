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
      className={
        type === "radio" ? "" : `text-black rounded-md h-8 w-full ${className}`
      }
      placeholder={placeholder}
    />
  );
};

export default Input;
