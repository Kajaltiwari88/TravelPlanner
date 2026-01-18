import { useState, useEffect } from "react";
import {
  MoonFilled,
  MoonOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Explore", path: "/explore" },
  { label: "Trips", path: "/trips" },
  {
    label: "Notes",
    children: [
      { label: "📩 Add New Note", path: "/notes" },
      { label: "📄 Saved Notes", path: "/notes/saved" },
    ],
  },
  { label: "Login", path: "/auth", showWhen: "loggedOut" },
  { label: "Logout", action: "logout", showWhen: "loggedIn" },
];

const Navbar = () => {
  const { user, logout } = useAuth?.() || {};
  const { toggleTheme, theme } = useTheme?.() || {};
  const navigate = useNavigate?.();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const handleResize = () => {
      if (window?.innerWidth >= 768) {
        setMobileOpen(false);
        setNotesOpen(false);
      }
    };
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  const shouldRender = (item) => {
    if (item?.showWhen === "loggedIn") return isLoggedIn;
    if (item?.showWhen === "loggedOut") return !isLoggedIn;
    return true;
  };

  const handleClick = (item) => {
    if (item?.action === "logout") logout?.();
    if (item?.path) navigate?.(item?.path);
    setMobileOpen(false);
    setNotesOpen(false);
  };

  const renderItem = (item, isMobile = false) => {
    if (!shouldRender(item)) return null;

    if (item?.children) {
      return !isMobile ? (
        <div key={item?.label} className="relative group">
          <span className="text-(--text-secondary) cursor-pointer hover:text-(--primary)">
            {item?.label}
          </span>

          <div className="absolute top-full left-0 mt-2 w-44 rounded-lg bg-(--bg) border border-(--border) shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            {item?.children?.map((child) => (
              <div
                key={child?.label}
                onClick={() => handleClick(child)}
                className="px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--primary) cursor-pointer"
              >
                {child?.label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div key={item?.label}>
          <div
            onClick={() => setNotesOpen((p) => !p)}
            className="flex justify-between items-center text-lg text-(--text-secondary) cursor-pointer"
          >
            <span>{item?.label}</span>
            <span>{notesOpen ? "-" : "+"}</span>
          </div>

          {notesOpen && (
            <div className="ml-4 mt-3 flex flex-col gap-3">
              {item?.children?.map((child) => (
                <span
                  key={child?.label}
                  onClick={() => handleClick(child)}
                  className="text-(--text-secondary) hover:text-(--primary) cursor-pointer"
                >
                  {child?.label}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <span
        key={item?.label}
        onClick={() => handleClick(item)}
        className="text-(--text-secondary) cursor-pointer hover:text-(--primary)"
      >
        {item?.label}
      </span>
    );
  };

  return (
    <>
      <nav className="w-full px-8 py-4 flex items-center justify-between bg-(--bg) border-b border-(--border)">
        <div
          className="text-xl font-bold tracking-wide text-(--text-primary) cursor-pointer"
          onClick={() => navigate?.("/")}
        >
          Smart<span className="text-(--primary)">Travel</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {navItems?.map((item) => renderItem(item))}
          <button
            onClick={toggleTheme}
            className="text-lg cursor-pointer text-(--text-secondary) hover:text-(--primary)"
          >
            {theme === "dark" ? <MoonFilled /> : <MoonOutlined />}
          </button>
        </div>

        <button
          className="md:hidden text-xl text-(--text-primary)"
          onClick={() => setMobileOpen(true)}
        >
          <MenuOutlined />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-(--bg)">
          <div className="flex items-center justify-between px-6 py-4 border-b border-(--border)">
            <div
              className="text-xl font-bold tracking-wide text-(--text-primary) cursor-pointer"
              onClick={() => navigate?.("/")}
            >
              Smart<span className="text-(--primary)">Travel</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-xl text-(--text-primary)"
            >
              <CloseOutlined />
            </button>
          </div>

          <div className="px-6 py-6 flex flex-col gap-6">
            {navItems?.map((item) => renderItem(item, true))}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 text-(--text-secondary)"
            >
              {theme === "dark" ? <MoonFilled /> : <MoonOutlined />}
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
