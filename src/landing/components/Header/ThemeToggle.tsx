import { useState, useEffect } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      if (savedTheme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, []);

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <button
      className="hover:scale-125 justify-self-center col-span-2"
      onClick={handleTheme}
    >
      {theme === "dark" ? <IoSunny /> : <IoMoon />}
    </button>
  );
};

export default ThemeToggle;
