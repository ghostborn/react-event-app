import { useCallback } from "react";
import { fetchEventAttendees, removeAttendeeFromEvent, addAttendeeToEvent } from "../api/attendees.ts";

import { deleteEvent, fetchEventById } from "../api/events.ts";
import { fetchUsers } from "../api/user.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import type { EventData, User } from "../types.ts";

import { useParams, useNavigate } from "react-router-dom";
import { AddAttendeeModal } from "../components/Attendees/AddAttendeeModal.tsx";
import { CalendarIcon, MapPinIcon, PencilIcon, TrashIcon } from "lucide-react";
import { formatDate } from "../utils/dateUtils.ts";
import { LoadingMessage } from "../components/LoadingMessage.tsx";
import { AttendeeSection } from "../components/Attendees/AttendeeSection.tsx";
import { Button } from "../components/Button.tsx";
import { useFetch } from "../hooks/useFetch.ts";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage.tsx";
import { useAsync } from "../hooks/useAsync.ts";
import { ConfirmModal } from "../components/ConfirmModal.tsx";


export function EventDetailsPage() {
  const { auth } = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [isAddAttendeeModalOpen, setIsAddAttendeeModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const getEvent = useCallback(
    () => fetchEventById(Number(eventId)),
    [eventId]
  );

  const getAttendees = useCallback(
    () => fetchEventAttendees(Number(eventId)),
    [eventId]
  );

  const {
    data: currentEvent,
    loading: eventLoading,
    error: eventError,
  } = useFetch<EventData>(getEvent);

  const {
    data: attendees,
    refetch: refetchAttendees,
    error: attendeesError,
  } = useFetch<User[]>(getAttendees);

  const getUsersIfAuthenticated = useCallback(
    () => (auth ? fetchUsers() : Promise.resolve([])),
    [auth]
  );

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch<User[]>(getUsersIfAuthenticated);

  const { run: deleteEventAction, error: deleteEventError } = useAsync({
    action: deleteEvent,
    onSuccess: () => navigate("/events"),
    errorMessage: "Failed to delete event"
  });

  const { run: removeAttendeeAction, error: removeError } = useAsync({
    action: removeAttendeeFromEvent,
    onSuccess: refetchAttendees,
    errorMessage: "Failed to remove attendee"
  });

  const { run: addAttendeeAction, error: addError } = useAsync({
    action: addAttendeeToEvent,
    onSuccess: refetchAttendees,
    errorMessage: "Failed to add attendee"
  });

  const error = eventError || attendeesError || usersError || removeError || addError || deleteEventError;
  if (eventLoading) {
    return <LoadingMessage message="Loading..."/>;
  }

  const currentAttendees = attendees || [];

  return (
    <div className="mx-auto my-8 flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
      {error && <ErrorMessage error={error}/>}
      <div className="flex flex-col-reverse gap-4 border-b border-gray-200 p-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="max-w-xl wrap-break-word text-xl font-semibold text-gray-800">
            {currentEvent?.name}
          </h2>
          <p className="mt-1 max-w-xl whitespace-pre-wrap wrap-break-word text-gray-600">
            {currentEvent?.description}
          </p>
        </div>
        {auth?.userId === currentEvent?.ownerId && (
          <div className="mb-4 flex shrink-0 gap-2 md:mb-0">
            <Button
              size="small"
              variant="secondary"
              icon={<TrashIcon className="h-4 w-4"/>}
              onClick={() => setIsDeleteConfirmModalOpen(true)}
            >
              Delete
            </Button>
            <Button
              size="small"
              variant="secondary"
              icon={<PencilIcon className="h-4 w-4"/>}
              onClick={() => navigate(`/events/${eventId}/edit`)}
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      <div className="min-h-[400px] flex-1 p-6">
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-800">
            Event Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="mr-3 h-5 w-5"/>
              <span>{formatDate(currentEvent?.date || "")}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="mr-3 h-5 w-5"/>
              <span>{currentEvent?.location}</span>
            </div>
          </div>
        </div>

        <AttendeeSection
          attendees={currentAttendees}
          isOwner={auth?.userId === currentEvent?.ownerId}
          setIsAddAttendeeModalOpen={setIsAddAttendeeModalOpen}
          handleRemoveAttendee={attendeeId =>
            removeAttendeeAction(attendeeId, Number(eventId))
          }
        />
      </div>

      <AddAttendeeModal
        isOpen={isAddAttendeeModalOpen}
        isLoading={usersLoading}
        eventId={currentEvent?.id || 0}
        existingAttendees={currentAttendees}
        users={users || []}
        onClose={() => setIsAddAttendeeModalOpen(false)}
        onAdd={userId => addAttendeeAction(Number(eventId), userId)}
      />

      <ConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        title="Delete Event"
        description={`Are you sure you want to delete "${currentEvent?.name}"?`}
        confirmButtonText="Delete"
        onConfirm={() => deleteEventAction(Number(eventId))}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
      />
    </div>
  );
}
