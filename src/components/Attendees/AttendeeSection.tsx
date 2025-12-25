import type { User } from "../../types.ts";
import { AttendeeHeader } from "./AttendeeHeader.tsx";
import { AttendeeList } from "./AttendeeList.tsx";

export function AttendeeSection({
  attendees,
  isOwner,
  setIsAddAttendeeModalOpen,
  handleRemoveAttendee,
}: {
  attendees: User[];
  isOwner: boolean;
  setIsAddAttendeeModalOpen: (isOpen: boolean) => void;
  handleRemoveAttendee: (id: number) => void;
}) {
  return (
    <div>
      <AttendeeHeader attendees={attendees} isOwner={isOwner} setIsAddAttendeeModalOpen={setIsAddAttendeeModalOpen}/>
      <AttendeeList attendees={attendees} isOwner={isOwner} onRemoveAttendee={handleRemoveAttendee}/>
    </div>
  );
}