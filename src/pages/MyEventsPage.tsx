import { useAuth } from "../contexts/AuthContext";
import { useCallback } from "react";
import { fetchUserEvents } from "../api/attendees.ts";
import { useFetch } from "../hooks/useFetch.ts";
import type { EventData } from "../types.ts";
import { EventList } from "../components/events/EventList.tsx";

export function MyEventsPage() {
  const { auth } = useAuth();
  const getUserEvents = useCallback(
    () => fetchUserEvents(auth?.userId),
    [auth]
  );

  const { data: events, loading, error } = useFetch<EventData[]>(getUserEvents);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Events I'm Attending</h1>
      <EventList events={events || []} loading={loading} error={error?.message ?? null}/>
    </div>
  );

}
