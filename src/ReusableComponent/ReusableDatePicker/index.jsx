import { DatePicker } from "antd";
import "./style.scss";

const { RangePicker } = DatePicker;

const AppDatePicker = ({
  type = "range", 
  value,
  onChange,
  disabledDate,
  allowClear = false,
  className = "",
  ...props
}) => {
  if (type === "single") {
    return (
      <DatePicker
        value={value}
        onChange={onChange}
        disabledDate={disabledDate}
        allowClear={allowClear}
        className={`app-date-picker ${className}`}
        {...props}
      />
    );
  }

  return (
    <RangePicker
      value={value}
      onChange={onChange}
      disabledDate={disabledDate}
      allowClear={allowClear}
      className={`app-date-picker ${className}`}
      {...props}
    />
  );
};

export default AppDatePicker;
