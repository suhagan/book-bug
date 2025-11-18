import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import CancelModal from "../common/CancelModal";


const Step3Address: React.FC = () => {
  const { formData, updateField } = useFormContext();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);


  const isValid =
    formData.street.trim() !== "" &&
    formData.zipCode.trim() !== "" &&
    formData.city.trim() !== "";

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;

    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-4");
    }, 300);
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-2");
    }, 300);
  };

  return (
    <div
      className={`form-step ${isExiting ? "slide-out-left" : "slide-in-right"}`}
    >
      <h2 className="form-title">Step 3 – Address</h2>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="street">Street Address</label>
          <input
            id="street"
            type="text"
            value={formData.street}
            onChange={(e) => updateField("street", e.target.value)}
          />
          {touched && formData.street.trim() === "" && (
            <p className="form-error">Street address is required.</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            id="zipcode"
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
          />
          {touched && formData.zipCode.trim() === "" && (
            <p className="form-error">Zip code is required.</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
          />
          {touched && formData.city.trim() === "" && (
            <p className="form-error">City is required.</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowCancelModal(true)}     
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
          onConfirm={() => navigate("/")}              // Navigate home
          onClose={() => setShowCancelModal(false)}
        />

      </div>
    </div>
  );
};

export default Step3Address;
