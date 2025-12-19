import { MoonFilled, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav
      className="
        w-full px-8 py-4
        flex items-center justify-between
        bg-(--bg)
        border-b border-(--border)
        transition-colors duration-300
      "
    >
      <div
        className="text-xl font-bold tracking-wide text-(--text-primary) cursor-pointer"
        onClick={() => navigate("/")}
      >
        Smart
        <span className="text-(--primary)">Travel</span>
      </div>

      <div className="flex gap-8 items-center">
        <span
          className="
            text-(--text-secondary)
            cursor-pointer
            hover:text-(--primary)
            transition
          "
          onClick={() => navigate("/explore")}
        >
          Explore
        </span>

        <span
          className="
            text-(--text-secondary)
            cursor-pointer
            hover:text-(--primary)
            transition
          "
          onClick={() => navigate("/trips")}
        >
          Trips
        </span>

        {user ? (
          <span
            className="
            text-(--text-secondary)
            cursor-pointer
            hover:text-(--primary)
            transition
          "
            onClick={() => logout()}
          >
            Logout
          </span>
        ) : (
          <span
            className="
            text-(--text-secondary)
            cursor-pointer
            hover:text-(--primary)
            transition
          "
            onClick={() => navigate("/auth")}
          >
            Login
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="
            text-lg cursor-pointer
            text-(--text-secondary)
            hover:text-(--primary)
            transition
          "
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <MoonFilled /> : <MoonOutlined />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
