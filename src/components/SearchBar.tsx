import type { ChangeEventHandler } from "react";
import { SearchIcon } from "lucide-react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="">
      <div className="">
        <SearchIcon className="h-4 w-4 text-gray-400"/>
      </div>
      <input
        type="text"
        placeholder="Search users..."
        className=""
        value={value}
        onChange={onChange}
      />
    </div>
  );

}