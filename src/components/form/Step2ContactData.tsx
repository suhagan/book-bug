import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import CancelModal from "../common/CancelModal";


const Step2ContactData: React.FC = () => {
  const { formData, updateField } = useFormContext();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);


  const emailValid =
    formData.email.trim() !== "" && formData.email.includes("@");

  const isValid = emailValid && formData.phone.trim() !== "";

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;

    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-3");
    }, 300);
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-1");
    }, 300);
  };

  return (
    <div
      className={`form-step ${isExiting ? "slide-out-left" : "slide-in-right"}`}
    >
      <h2 className="form-title">Step 2 – Contact Data</h2>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {touched && !emailValid && (
            <p className="form-error">Please enter a valid email.</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {touched && formData.phone.trim() === "" && (
            <p className="form-error">Phone number is required.</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowCancelModal(true)}      // back to Step 1
        >
          Cancel Sign Up!
        </button>

        <button type="button" className="btn-secondary" onClick={handleBack}>
          Back
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </button>
          <CancelModal
          isOpen={showCancelModal}
          onConfirm={() => navigate("/")}               // Navigate home
          onClose={() => setShowCancelModal(false)}
        />

      </div>
    </div>
  );
};

export default Step2ContactData;
