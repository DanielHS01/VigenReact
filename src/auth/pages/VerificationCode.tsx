import { useState, useRef, ChangeEvent } from "react";
import { useAuth } from "@/contexts/authContext";
import Button from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { verifyUser, resendCode } from "@/auth/services/authServices";
import FormContainer from "@/shared/ui/FormContainer";
import { FaLock } from "react-icons/fa6";

const VerificationCode = () => {
  const { userData, login } = useAuth();
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // Limit to 1 digit
    setCode(newCode);

    // Move focus to the next input if a digit is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullCode = code.join("");
      if (fullCode === userData?.code) {
        if (!userData?.identification) {
          throw new Error("Identificación no disponible");
        }
        await verifyUser(userData.identification, fullCode);
        login({ ...userData, verification: true });

        if (userData?.type === "User") {
          navigate("/HomeUser");
        } else if (userData?.type === "Organization") {
          navigate("/HomeOrganization");
        }
      } else {
        setError("Código incorrecto. Inténtalo nuevamente.");
      }
    } catch (error) {
      setError("Error al verificar el código.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setInfoMessage("");
    if (!userData?.identification) {
      setError("No hay identificación disponible para reenviar el código.");
      return;
    }

    try {
      await resendCode(userData.identification);
      setInfoMessage("Código reenviado correctamente. Revisa tu correo.");
    } catch (err) {
      setError("Error al reenviar el código.");
    }
  };

  return (
    <section className="p-16 flex items-center justify-center">
      <FormContainer>
        <div className="flex justify-center">
          <div className="relative bottom-14 bg-cyan-950 dark:bg-customCyan rounded-full flex justify-center w-16 h-16 items-center">
            <FaLock size={30} />
          </div>
        </div>
        <p className="text-center text-xs font-semibold lg:text-sm uppercase">
          Verificar código
        </p>
        <div className="flex flex-col gap-2 text-xs md:text-sm py-5">
          <div className="flex justify-between text-xs md:text-sm py-5">
            <p className="font-thin">¿No te llegó el código?</p>
            <button
              type="button"
              onClick={handleResendCode}
              className="uppercase font-bold hover:text-gray-200 transition-colors hover:underline underline-offset-2"
            >
              Reenviar código
            </button>
          </div>
          <p className="text-gray-500">
            Si no lo encuentras en tu bandeja de entrada, revisa la carpeta de
            spam.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label htmlFor="verification-code" className="mb-2">
              Código de verificación
            </label>
            <div className="flex gap-3 justify-center text-cyan-950 font-medium">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(index, e)
                  }
                  maxLength={1}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-950 dark:focus:ring-customCyan text-lg"
                />
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-center p-3">
            <Button type="submit" variant="outline" disabled={loading}>
              {loading ? (
                <span className="spinner">Verificando...</span>
              ) : (
                "Verificar"
              )}
            </Button>
          </div>
        </form>
        {infoMessage && (
          <p className="text-green-500 text-center">{infoMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </FormContainer>
    </section>
  );
};

export default VerificationCode;
