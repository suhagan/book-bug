import React from "react";

interface CancelModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Cancel Registration?</h3>
        <p className="modal-message">
          Are you sure you want to cancel your sign-up?  
          All entered information will be lost.
        </p>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onConfirm}>
            Yes, Cancel
          </button>
          <button className="modal-btn keep" onClick={onClose}>
            No, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
