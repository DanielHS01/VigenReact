export interface Alert {
    id: number;
    userId: string;
    title: string;
    stateId: number;
    description: string;
    organizationTypeId: number;
    date: string;
  }

  export interface OrganizationType {
    id: number;
    name: string;
    description: string;
  }
  
  export const fetchAlerts = async (): Promise<Alert[]> => {
    try {
      const response = await fetch("https://localhost:44385/api/Notify");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Alert[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
  };

  export const updateAlertState = async (alert: Alert): Promise<void> => {
    try {
      const response = await fetch(`https://localhost:44385/api/Notify/${alert.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alert), // Envía el objeto Alert completo
      });
  
      if (!response.ok) {
        throw new Error("Error updating alert state");
      }
    } catch (error) {
      console.error(`Error updating alert with id ${alert.id}:`, error);
      throw error;
    }
  };
  
  export const deleteAlert = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https://localhost:44385/api/Notify/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error deleting alert");
      }
    } catch (error) {
      console.error(`Error deleting alert with id ${id}:`, error);
      throw error;
    }
  };

  export const fetchOrganizationType = async (id: number): Promise<OrganizationType> => {
    try {
      const response = await fetch(`https://localhost:44385/api/OrganizationType/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: OrganizationType = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching organization type with id ${id}:`, error);
      throw error;
    }
  };