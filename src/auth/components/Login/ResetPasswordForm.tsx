import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("organization");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      role === "organization"
        ? `https://vigenbackend.up.railway.app/api/organization/reset-password/${identifier}`
        : `https://vigenbackend.up.railway.app/api/user/reset-password/${identifier}`;

    const options: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body:
        role === "organization"
          ? JSON.stringify({ newPassword }) // para organización
          : null, // para usuario, no se envía body
    };

    const response = await fetch(url, options);

    if (response.ok) {
      setMessage("Success");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      const err = await response.text();
      setMessage("Error: " + err);
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4 text-sm">
      <h2 className="text-center font-bold text-lg">Restablecer Contraseña</h2>
      <label className="block">
        Rol:
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="organization">Organización</option>
          <option value="user">Usuario</option>
        </select>
      </label>
      <label className="block">
        {role === "organization" ? "NIT" : "Identificación"}
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </label>
      {role === "organization" && (
        <label className="block">
          Nueva Contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required={role === "organization"}
            className="w-full border rounded px-2 py-1"
          />
        </label>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Restablecer
      </button>
      {message && (
        <p className="text-center mt-2 text-red-500">
          {role === "organization"
            ? "Contraseña restablecida correctamente."
            : "La nueva contraseña fue enviada al correo."}
        </p>
      )}
    </form>
  );
};

export default ResetPasswordForm;
