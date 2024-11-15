import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { verifyUser } from "@/auth/services/authServices"; // Importa el servicio
import FormContainer from "@/shared/ui/FormContainer";
import { FaLock } from "react-icons/fa6";

const VerificationCode = () => {
  const { userData, login } = useAuth(); // Obtén los datos del usuario desde el contexto
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Verificar el código
      if (code === userData?.code) {
        if (!userData?.identification) {
          throw new Error("Identificación no disponible");
        }
        // Llamar al backend para actualizar el estado de verificación en la base de datos
        await verifyUser(userData.identification, code);

        // Si el código es correcto, actualizar el estado del usuario en el frontend
        login({ ...userData, verification: true });

        // Navegar a la página correspondiente después de la verificación
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
        <div className="flex justify-between text-xs md:text-sm py-5">
          <p className="font-thin">¿No te llegó el código?</p>
          <Link
            to="/roles"
            className="uppercase font-bold hover:text-gray-200 transition-colors hover:underline underline-offset-2"
          >
            Reenviar código
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label>Código de verificación</label>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="0000"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
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
      </FormContainer>
    </section>
  );
};

export default VerificationCode;
