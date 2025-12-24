import { useFetch } from "../hooks/useFetch.ts";
import { fetchEvents } from "../api/events.ts";
import type { EventData } from "../types.ts";
import { EventList } from "../components/events/EventList.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useState } from "react";
import { Button } from "../components/Button.tsx";
import { PlugIcon } from "lucide-react";
import { AddEventModal } from "../components/events/AddEventModal.tsx";

export function EventsPage() {
  const { isAuthenticated } = useAuth();
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const { data, loading, error, refetch } = useFetch<EventData[]>(fetchEvents);
  const events = data ?? [];

  const handleAddEvent = () => {
    refetch();
    setIsAddEventModalOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Events</h1>
        <div className="">
          {isAuthenticated && (
            <Button
              icon={<PlugIcon className="mr-1 h-4 w-4"/>}
              onClick={() => setIsAddEventModalOpen(true)}
            >
              Add Event
            </Button>
          )}
        </div>
      </div>
      <EventList events={events} loading={loading} error={error?.message ?? null}/>
      {isAddEventModalOpen && isAuthenticated && (
        <AddEventModal
          isOpen={isAddEventModalOpen}
          onClose={() => setIsAddEventModalOpen(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </>
  );
}