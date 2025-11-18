import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import CancelModal from "../common/CancelModal";


const Step4Visit: React.FC = () => {
  const { formData, updateField } = useFormContext();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);


  const isValid =
    formData.purposeOfVisit.trim() !== "" &&
    formData.department.trim() !== "";

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;

    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-5");
    }, 300);
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-3");
    }, 300);
  };

  return (
    <div
      className={`form-step ${isExiting ? "slide-out-left" : "slide-in-right"}`}
    >
      <h2 className="form-title">Step 4 – Visit Details</h2>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="purpose">Purpose of Visit</label>
          <input
            id="purpose"
            type="text"
            value={formData.purposeOfVisit}
            onChange={(e) => updateField("purposeOfVisit", e.target.value)}
          />
          {touched && formData.purposeOfVisit.trim() === "" && (
            <p className="form-error">Purpose of visit is required.</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="dept">Department to be Visited</label>
          <input
            id="dept"
            type="text"
            value={formData.department}
            onChange={(e) => updateField("department", e.target.value)}
          />
          {touched && formData.department.trim() === "" && (
            <p className="form-error">Department is required.</p>
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
          onConfirm={() => navigate("/")}              // navigate home
          onClose={() => setShowCancelModal(false)}
        />

      </div>
    </div>
  );
};

export default Step4Visit;
