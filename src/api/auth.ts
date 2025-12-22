import type { User } from "../types.ts";
import { API_BASE_URL, apiFetch } from "./api.ts";

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await apiFetch(`${API_BASE_URL}/v1/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};