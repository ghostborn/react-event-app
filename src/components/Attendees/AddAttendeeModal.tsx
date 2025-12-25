import type { User } from "../../types.ts";
import { useState } from "react";
import { Button } from "../Button.tsx";
import { XIcon } from "lucide-react";
import { SearchBar } from "../SearchBar.tsx";
import { LoadingMessage } from "../LoadingMessage.tsx";
import { AttendeeList } from "./AttendeeList.tsx";

interface AddAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  existingAttendees: User[];
  users: User[];
  isLoading: boolean;
  onAdd: (userId: number) => Promise<void>;
}

export function AddAttendeeModal({
  isOpen,
  onClose,
  existingAttendees,
  users,
  isLoading,
  onAdd,
}: AddAttendeeModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const availableUsers = users.filter(
    (user) => !existingAttendees.some((attendee) => attendee.id === user.id)
  );

  const filteredUser =
    searchTerm.trim() === ""
      ? availableUsers
      : availableUsers.filter(
        (user) =>
          user.name.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );

  const handleAddAttendee = async (userToAdd: User) => {
    try {
      setIsAdding(true);
      await onAdd(userToAdd.id);
    } finally {
      setIsAdding(false);
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedUser(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className=""
      onClick={onClose}
    >
      <div
        className=""
        onClick={e => e.stopPropagation()}
      >
        <div className="">
          <h2 className="">Add Attendee</h2>
          <Button size="small" variant="secondary" onClick={onClose}>
            <XIcon className="h-5 w-5"/>
          </Button>
        </div>

        <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>

        <div className="">
          {isLoading ? (
            <LoadingMessage message="Loading..."/>
          ) : (
            <AttendeeList attendees={filteredUser} mode="selection" selectedAttendee={selectedUser} onAttendeeSelect={setSelectedUser}/>
          )}
        </div>

        <div className="">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => selectedUser && handleAddAttendee(selectedUser)}
            disabled={!selectedUser || isAdding}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </div>


      </div>

    </div>
  );


}
