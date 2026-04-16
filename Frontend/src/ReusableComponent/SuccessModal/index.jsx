import { Modal, Button } from "antd";

const SuccessModal = ({
  open,
  onClose,
  title = "Success!",
  description,
  buttonText = "Continue",
  onAction,
}) => {
  return (
    <Modal open={open} footer={null} centered closable={false} width={420}>
      <div className="text-center py-4">
        <div className="text-4xl mb-3">🎉</div>

        <h2 className="text-xl font-semibold text-(--text-primary)">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-(--text-secondary)">{description}</p>
        )}

        <Button
          type="primary"
          block
          size="large"
          className="mt-6"
          style={{
            background: "var(--primary)",
            borderColor: "var(--primary)",
          }}
          onClick={() => {
            onClose();
            onAction?.();
          }}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
