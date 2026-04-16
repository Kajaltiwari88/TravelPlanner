const Footer = () => {
  return (
    <footer
      className="
        w-full mt-auto
        bg-(--bg-soft)
        border-t border-(--border)
        transition-colors duration-300 
      "
    >
      <div className="mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-(--text-muted)">
          © {new Date().getFullYear()} SmartTravel. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <span
            className="
              cursor-pointer
              text-(--text-secondary)
              hover:text-(--primary)
              transition
            "
          >
            About
          </span>

          <span
            className="
              cursor-pointer
              text-(--text-secondary)
              hover:text-(--primary)
              transition
            "
          >
            Privacy
          </span>

          <span
            className="
              cursor-pointer
              text-(--text-secondary)
              hover:text-(--primary)
              transition
            "
          >
            Terms
          </span>

          <span
            className="
              cursor-pointer
              text-(--text-secondary)
              hover:text-(--primary)
              transition
            "
          >
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
