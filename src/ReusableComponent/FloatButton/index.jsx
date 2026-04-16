import { useState } from "react";
import { FloatButton } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "./style.css";

const FloatButtonComp = () => {
  const [open, setOpen] = useState(false);

  return (
    <FloatButton
      shape="default"
      className={`chat-float-btn ${open ? "open" : ""}`}
      icon={<CommentOutlined />}
      content={<span className="chat-text">Chat with us</span>}
      onClick={() => setOpen((prev) => !prev)}
    />
  );
};

export default FloatButtonComp;
