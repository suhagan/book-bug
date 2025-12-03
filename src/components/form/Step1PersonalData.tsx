import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import CancelModal from "../common/CancelModal";


const Step1PersonalData: React.FC = () => {
  const { formData, updateField } = useFormContext();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);


  const isValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.dateOfBirth.trim() !== "" &&
    formData.gender.trim() !== "";

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;

    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-2");
    }, 300); // match CSS animation duration
  };

  return (
    <div className={`form-step ${isExiting ? "slide-out-left" : "slide-in-right"}`}>
      <h2 className="form-title">Step 1 – Personal Data</h2>

      <div className="form-grid">
        <div className="form-field">
          <label>First Name</label>
          <input
            id="firstName"
            type="text"
            title="First name"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />
          {touched && formData.firstName.trim() === "" && (
            <p className="form-error">First name is required.</p>
          )}
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input
            id="lastName"
            type="text"
            title="Last name"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        
          {touched && formData.lastName.trim() === "" && (
            <p className="form-error">Last name is required.</p>
          )}
        </div>

        <div className="form-field">
          <label>Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            title="Date of birth"
            value={formData.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
          />
          {touched && formData.dateOfBirth.trim() === "" && (
            <p className="form-error">Date of birth is required.</p>
          )}
        </div>

        <div className="form-field">
          <label>Gender</label>
          <select
            id="gender"
            title="Gender selection"
            value={formData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          >
            <option value="">Select gender…</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="nonbinary">Non-binary</option>
            <option value="other">Other</option>
            <option value="prefer-not">Prefer not to say</option>
          </select>
          {touched && formData.gender.trim() === "" && (
            <p className="form-error">Please select a gender.</p>
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


        {/* No Back button on first step */}
        
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
          onConfirm={() => navigate("/")}     // Step 1 → Go Home
          onClose={() => setShowCancelModal(false)}
        />

      </div>
    </div>
  );
};

export default Step1PersonalData;
