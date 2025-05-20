import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
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
          ? JSON.stringify({ newPassword })
          : null,
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
    <div className="m-10 flex items-center justify-center">
      <div className="bg-customCyan text-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-950 rounded-full p-3">
            <RiLockPasswordLine className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-center font-bold text-xl mb-2">{t("ResetPassword.resetPassword")}</h2>
        <p className="text-center text-gray-400 text-sm mb-6">{t("ResetPassword.selectRoleAndId")}</p>
        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-300 mb-1">{t("ResetPassword.role")}:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white text-cyan-950 rounded px-3 py-2 focus:outline-none"
            >
              <option value="organization" className="focus:bg-black">{t("ResetPassword.organization")}</option>
              <option value="user">{t("ResetPassword.user")}</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">
              {role === "organization" ? t("ResetPassword.nit") : t("ResetPassword.identification")}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full bg-white text-cyan-950 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          {role === "organization" && (
            <div>
              <label className="block text-gray-300 mb-1">{t("ResetPassword.newPassword")}:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required={role === "organization"}
                className="w-full bg-white text-gray-800 rounded px-3 py-2 focus:outline-none"
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-customCyan text-white rounded border border-white px-4 py-2 hover:bg-white hover:text-cyan-950 transition"
          >
            {t("ResetPassword.reset")}
          </button>
          {message && (
            <div className="text-center mt-4">
              <p className="text-green-400">
                {role === "organization"
                  ? t("ResetPassword.passwordResetSuccessOrg")
                  : t("ResetPassword.passwordSentSuccessUser")}
              </p>
              {role !== "organization" && (
                <p className="text-gray-400 text-xs mt-2">{t("ResetPassword.checkSpam")}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;