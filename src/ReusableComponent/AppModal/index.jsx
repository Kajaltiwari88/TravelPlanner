import { Modal } from "antd";
import ReusableButton from "../ReusableButton";
import "./style.scss";
import ReusableInput from "./../ReusableInput/index";

const AppModal = ({
  open,
  title,
  description,
  primaryText = "Confirm",
  secondaryText = "Cancel",
  onPrimary,
  onSecondary,
  onClose,
  loading = false,
  danger = false,
  isInputRequired = false,
  inputVal,
  handleInputChange,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      maskClosable={!loading}
      className="app-modal"
    >
      {title && (
        <h2 className="text-[24px] font-semibold text-(--text-primary) mb-2">
          {title}
        </h2>
      )}

      {description && (
        <p className="mt-2 text-[18px] text-(--text-secondary)">
          {description}
        </p>
      )}

      {isInputRequired && (
        <ReusableInput
          // label="Enter the name for your note"
          placeholder="Type here"
          value={inputVal}
          onChange={handleInputChange}
          className="w-[100px] h-10! text-[16px]!"
        />
      )}
      <div className="mt-6 flex justify-end gap-3">
        {secondaryText && (
          <ReusableButton
            text={secondaryText}
            variant="secondary"
            onClick={onSecondary || onClose}
            className="w-[100px] h-10! text-[16px]!"
          />
        )}

        <ReusableButton
          text={primaryText}
          variant={danger ? "danger" : "primary"}
          loading={loading}
          onClick={onPrimary}
          className="w-[100px] h-10! text-[16px]!"
        />
      </div>
    </Modal>
  );
};

export default AppModal;
