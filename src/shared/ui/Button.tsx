import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "px-6 py-1 rounded-md transition-colors duration-300",
  variants: {
    variant: {
      primary:
        "bg-cyan-950 hover:bg-cyan-600 text-white dark:bg-cyan-50 dark:text-cyan-950 dark:hover:bg-cyan-100",
      secondary:
        "bg-transparent border border-cyan-950 hover:bg-cyan-950 hover:text-white dark:border-indigo-100 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-cyan-950",
      outline:
        "bg-transparent border border-white hover:bg-white hover:text-cyan-950",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: ReactNode;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(button({ variant }), className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
