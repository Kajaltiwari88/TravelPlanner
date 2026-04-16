import { Button } from "antd";
import "./style.css";

const ReusableButton = ({
  text,
  variant = "primary",
  size = "middle",
  loading = false,
  disabled = false,
  icon,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <Button
      {...props}
      size={size}
      icon={icon}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={`app-btn app-btn--${variant} ${className}`}
    >
      {text}
    </Button>
  );
};

export default ReusableButton;
