const AppCard = ({
  title,
  subtitle,
  rightContent,
  children,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl
        border border-(--input-border)
        bg-(--bg-soft)
        p-5
        transition
        ${onClick ? "cursor-pointer hover:shadow-md" : ""}
        ${className}
      `}
    >
      {(title || subtitle || rightContent) && (
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            {title && (
              <h3 className="text-md font-semibold text-(--text-primary)">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-(--text-secondary)">{subtitle}</p>
            )}
          </div>

          {rightContent && <div>{rightContent}</div>}
        </div>
      )}

      {children}
    </div>
  );
};

export default AppCard;
