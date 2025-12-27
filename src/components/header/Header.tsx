import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { Menu, X, CalendarIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../Button.tsx";

const navItems = [
  { to: "/", label: "All Events", icon: CalendarIcon },
  { to: "/my-events", label: "Attending", icon: UserIcon }
];

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMobileMenu();
  };


  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <h1 className="text-xl font-bold">Event App</h1>
      <nav className="flex items-center gap-4">
        <ul className="flex gap-4">
          <li>
            <Link to="/">All Events</Link>
          </li>
          <li>
            <Link to="/my-events">My Event</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Button variant="secondary" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
