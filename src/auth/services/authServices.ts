const BASE_URL = 'https://vigenbackend.up.railway.app/api';

export interface RegisterData {
    identification: string;
    name: string;
    email: string;
    gender: string;
    CountryCode: string;
    phone: string;
    birthdate: string;
    occupation: string;
    PostalCode: string;
    MaritalStatus: string;
    password: string;
    ubication: string;
    Code: string;
  }

  export interface OrganizationData {
    nit: string;
    password: string;
    newPassword?: string;
    name: string;
    tel: string;
    phone: string;
    organizationTypeId: number;
  }
  
  export interface HeadquartersData {
    id: string;
    nit: string;
    ubication: string;
    range: number;
    countryCode: string;
    phone: string;
    tel: string;
  }

  export const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/User/${username}/${password}`);
    if (!response.ok) {
      return null; // En lugar de lanzar un error, retorna null si falla
    }
    return response.json(); // Asegúrate de retornar siempre los datos
  };
  
  export const loginOrganization = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/Organization/${username}/${password}`);
    if (!response.ok) {
      return null; // Si el login falla, retorna null
    }
    return response.json();
  };

export const register = async (dataToSend: RegisterData) => {
  try {
    const response = await fetch(`${BASE_URL}/User`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en el registro: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error de conexión o en el registro", error);
    throw error;
  }
};

export const verifyUser = async (userId: string, code: string) => {
  const response = await fetch(`${BASE_URL}/User/verify/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error("Error verifying user");
  }

  return response.json();
};

export const updateUser = async (userId: string, updatedData: Partial<RegisterData>) => {
  try {
    const response = await fetch(`${BASE_URL}/User/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      // Intenta obtener los datos del error en JSON
      let errorMessage = "Error al actualizar el usuario.";
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage += ` ${errorData.message}`;
        }
      } catch (jsonError) {
        // Si el JSON no es parseable, significa que no hubo un mensaje en JSON
        console.error("No se pudo parsear el mensaje de error:", jsonError);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/User/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching user data");
  }

  return response.json();
};

export const registerOrganization = async (data: OrganizationData) => {
  try {
    const response = await fetch(`${BASE_URL}/Organization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en el registro de organización: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el registro de organización", error);
    throw error;
  }
};

// Función para registrar una sede
export const registerHeadquarters = async (data: HeadquartersData) => {
  try {
    const response = await fetch(`${BASE_URL}/Site`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en el registro de sede: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el registro de sede", error);
    throw error;
  }
};

export const getOrganizationById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/Organization/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los datos de la organización");
  }

  return response.json();
};

export const updateOrganization = async (id: string, updatedData: Partial<OrganizationData>) => {
  try {
    const response = await fetch(`${BASE_URL}/Organization/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al actualizar la organización: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la organización", error);
    throw error;
  }
};

export const getHeadquarters = async (nit: string): Promise<HeadquartersData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Site/${nit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener las sedes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las sedes:", error);
    throw error;
  }
};

export const resendCode = async (identification: string) => {
  const response = await fetch(`${BASE_URL}/user/resend-code`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ identification })
  });

  if (!response.ok) {
    throw new Error("No se pudo reenviar el código.");
  }

  return response.text();
};