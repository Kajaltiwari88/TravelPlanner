import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./style.css";

const ReusableSearch = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search",
  size = "middle",
  disabled = false,
  className = "",
  allowClear = true,
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      onPressEnter={onSearch}
      disabled={disabled}
      size={size}
      allowClear={allowClear}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      className={`app-search ${className}`}
    />
  );
};

export default ReusableSearch;
