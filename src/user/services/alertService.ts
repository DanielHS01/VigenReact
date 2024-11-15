export interface AlertData {
    userId: string;
    title: string;
    stateId: number;
    description: string;
    organizationTypeId: number;
    date: string;
  }
  
  
  export const sendAlert = async (data: AlertData): Promise<void> => {
    try {
      const response = await fetch("https://localhost:44385/api/Notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar la alerta");
      }
  
      console.log("Alerta enviada con éxito");
    } catch (error) {
      console.error("No se pudo enviar la alerta:", error);
      throw error;
    }
  };
  