import { InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils";
import { VariantProps, tv } from "tailwind-variants";

const input = tv({
  base: "text-black rounded-md h-8 w-full",
  variants: {
    variant: {
      text: "text-black rounded-md h-8 w-full",
      radio: "h-4 w-4 rounded-full",
      textForm: "w-64",
    },
  },
});

type InputVariants = VariantProps<typeof input>;
interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputVariants {}

const Input = ({ variant, className, ...props }: InputProps) => {
  return <input className={cn(input({ variant }), className)} {...props} />;
};

export default Input;
