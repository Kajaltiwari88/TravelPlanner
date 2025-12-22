import { Select } from "antd";
import "./style.scss";

const { Option } = Select;

const ReusableSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  mode,
  disabled = false,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className={`text-sm text-(--text-secondary) font-["Inter"]!`}>
          {label}
        </label>
      )}

      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        mode={mode}
        disabled={disabled}
        size="large"
        className={`app-select ${className} font-["Inter"]!`}
        dropdownClassName="app-select-dropdown"
        {...rest}
      >
        {options?.map((opt) => (
          <Option key={opt?.value} value={opt?.value}>
            {opt?.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ReusableSelect;
