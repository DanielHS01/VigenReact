import { loginUser, loginOrganization } from "@/auth/services/authServices";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/authContext"; // Importa el hook de autenticación

const LoginForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Obtén la función login del contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Intenta autenticar como usuario
      const userData = await loginUser(username, password);

      if (userData?.token) {
        // Login de usuario exitoso
        login({
          token: userData.token,
          name: userData.name,
          gender: userData.gender,
          email: userData.email,
          identification: userData.identification,
          birthdate: userData.birthdate,
          country_code: userData.country_code,
          phone: userData.phone,
          occupation: userData.occupation,
          postal_code: userData.postal_code,
          marital_status: userData.marital_status,
          ubication: userData.ubication,
          code: userData.code,
          verification: userData.verification,
          type: "User",
          password: userData.password,
        });
      } else {
        // Si el login de usuario falla, intentar como organización
        const orgData = await loginOrganization(username, password);
        console.log("Org Data: ", orgData);

        if (orgData?.token) {
          // Login de organización exitoso
          login({
            token: orgData.token,
            name: orgData.name,
            nit: orgData.nit,
            tel: orgData.tel,
            phone: orgData.phone,
            organizationTypeId: orgData.organizationType,
            type: "Organization",
          });
        } else {
          setError("Usuario o contraseña incorrectos.");
        }
      }
    } catch (err) {
      setError("Error en la conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col">
        <label>{t("Login.id")}</label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="1234567890"
        />
      </div>
      <div className="flex flex-col">
        <label>{t("Login.password")}</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center p-3">
        <Button type="submit" variant="outline" disabled={loading}>
          {loading ? (
            <span className="spinner">Cargando...</span>
          ) : (
            t("Login.button")
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
