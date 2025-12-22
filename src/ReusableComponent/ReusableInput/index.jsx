import { Input } from "antd";

const ReusableInput = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className={`font-["Inter"]! text-sm text-(--text-secondary)`}>
          {label}
        </label>
      )}

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        size="large"
        className={`
          rounded-xl!
          bg-(--input-bg)!
          text-(--text-primary)!
          placeholder-(--input-placeholder)!
          border-(--input-border)!
          focus:border-(--primary)!
          hover:border-(--primary)! font-["Inter"]!
          ${className}
        `}
        {...rest}
      />
    </div>
  );
};

export default ReusableInput;
