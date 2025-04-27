// src/services/userServices.ts

export const downloadUserReport = async () => {
    const response = await fetch(`https://vigenbackend.up.railway.app/api/User/reporte/pdf`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si usas token, si no, puedes quitar esto
      },
    });
  
    if (!response.ok) {
      throw new Error("Error descargando el reporte");
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Reporte_Usuarios.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  
export const downloadNotifyReport = async () => {
  const response = await fetch(`https://vigenbackend.up.railway.app/api/Notify/reporte/pdf`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Si usas token, si no, puedes quitar esto
    },
  });

  if (!response.ok) {
    throw new Error("Error descargando el reporte");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Reporte_Alertas.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  };