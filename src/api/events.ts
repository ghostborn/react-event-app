import type { EventData } from "../types.ts";
import { API_BASE_URL, apiFetch } from "./api.ts";

export const fetchEvents = async (): Promise<EventData[]> => {
  console.log("fetchEvents called at:", new Date().toISOString()); // 新增日志
  try {
    const response = await apiFetch(`${API_BASE_URL}/v1/events`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};