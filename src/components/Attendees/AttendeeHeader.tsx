import type { User } from "../../types.ts";

interface AttendeeHeaderProps {
  attendess: User[];
  isOwner: boolean;
  setIsAddAttendeeModalOpen: (isOpen: boolean) => void;
}
