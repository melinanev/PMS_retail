import { UserData } from "../interfaces/UserData";

export const getUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok){
      throw new Error("Invalid response, check network tab");
    }

    return data;
  } catch (error) {
    console.error("Error grabbing users:", error);
    return [];
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Check the network tab...again");
    }

    return data;
  } catch (error) {
    console.error("Error grabbing the user", error);
    return null;
  }
};

export const createUser = async (body: UserData) => {
  try {
    const response = await fetch('/api/users', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Check the network tab..seriously");
    }

    return data;
  } catch (error) {
    console.error("Error creating user", error);
    return Promise.reject("Could not create user");
  }
}

export const updateUser = async (
  id: number,
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password?: string;
  }
) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if(!response.ok) {
      throw new Error("NETWORK TAB");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    return Promise.reject("Could not update user")
  }
};

export const deleteUser = async(id: number) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok){
      throw new Error("NETWORK TAB!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return Promise.reject("Could not delete user")
  }
};

