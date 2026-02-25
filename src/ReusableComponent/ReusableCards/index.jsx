import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

const AppCard = ({
  title,
  subtitle,
  rightContent,
  children,
  onClick,
  className = "",
  menuItems = [],
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`
        relative
        rounded-2xl
        border border-(--input-border)
        bg-(--bg-soft)
        p-5
        transition
        ${onClick ? "cursor-pointer hover:shadow-md" : ""}
        ${className}
      `}
    >
      {(title || subtitle || rightContent || menuItems.length > 0) && (
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            {title && (
              <h3 className="text-md font-semibold text-(--text-primary)">
                {title}
              </h3>
            )}
            {subtitle && (
              <div className="text-sm text-(--text-secondary)">{subtitle}</div>
            )}
          </div>

          <div className="flex items-start gap-2">
            {rightContent}

            {menuItems?.length > 0 && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    setOpenMenu((prev) => !prev);
                  }}
                  className="text-(--text-secondary) hover:text-(--primary) cursor-pointer"
                >
                  <MoreOutlined />
                </button>

                {openMenu && (
                  <div
                    onClick={(e) => e?.stopPropagation()}
                    className="
                      absolute right-0 mt-2 min-w-1
                      w-32
                      bg-(--bg)
                      border border-(--border)
                      rounded-lg
                      shadow-lg
                      z-50
                    "
                  >
                    {menuItems?.map((item) => (
                      <div
                        key={item?.label}
                        onClick={() => {
                          setOpenMenu(false);
                          item?.onClick();
                        }}
                        className="
                          px-4 py-2 
                          text-md
                          text-(--text-secondary)
                          hover:bg-(--bg-secondary)
                          hover:text-(--primary)
                          cursor-pointer
                        "
                      >
                        {item?.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default AppCard;
