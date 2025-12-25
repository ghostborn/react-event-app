import type { User } from "../../types.ts";
import { Button } from "../Button.tsx";
import { PlugIcon } from "lucide-react";

interface AttendeeHeaderProps {
  attendees: User[];
  isOwner: boolean;
  setIsAddAttendeeModalOpen: (isOpen: boolean) => void;
}

export function AttendeeHeader({
  attendees,
  isOwner,
  setIsAddAttendeeModalOpen,
}: AttendeeHeaderProps) {
  return (
    <div className="">
      <h3 className="">
        {attendees.length > 0 ? "Attendees" : "No attendees yet"}{""}
        <span className="">({attendees.length})</span>
      </h3>
      {isOwner && (
        <Button
          variant="secondary"
          size="small"
          icon={<PlugIcon className="h-4 w-4"/>}
          onClick={() => setIsAddAttendeeModalOpen(true)}
        >
          Add Attendee
        </Button>
      )}
    </div>
  );
}