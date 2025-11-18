import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import CancelModal from "../common/CancelModal";


const Step5Summary: React.FC = () => {
  const { formData, updateField, resetForm } = useFormContext();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);


  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register/step-4");
    }, 300);
  };

  const handleSubmit = () => {
    // In a real app you would send formData to backend here
    console.log("Submitted data:", formData);

    setSubmitted(true);
    resetForm();

    // Optional: navigate somewhere else after a short delay
    setTimeout(() => {
      navigate("/"); // back to home or wherever in your BookShop
    }, 1500);
  };

  return (
    <div
      className={`form-step ${isExiting ? "slide-out-left" : "slide-in-right"}`}
    >
      <h2 className="form-title">Step 5 – Summary & Confirmation</h2>

      {submitted ? (
        <p className="form-success">
          Thank you! Your registration has been submitted.
        </p>
      ) : (
        <>
          <div className="summary-grid">
            <div className="summary-section">
              <h3>Personal Data</h3>
              <p>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {formData.dateOfBirth}
              </p>
              <p>
                <strong>Gender:</strong> {formData.gender}
              </p>
            </div>

            <div className="summary-section">
              <h3>Contact</h3>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
            </div>

            <div className="summary-section">
              <h3>Address</h3>
              <p>
                <strong>Street:</strong> {formData.street}
              </p>
              <p>
                <strong>Zip Code:</strong> {formData.zipCode}
              </p>
              <p>
                <strong>City:</strong> {formData.city}
              </p>
            </div>

            <div className="summary-section">
              <h3>Visit</h3>
              <p>
                <strong>Purpose:</strong> {formData.purposeOfVisit}
              </p>
              <p>
                <strong>Department:</strong> {formData.department}
              </p>
            </div>
          </div>

          <div className="form-field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={formData.subscribeToNewsletter}
                onChange={(e) =>
                  updateField("subscribeToNewsletter", e.target.checked)
                }
              />
              Subscribe to Newsletter
            </label>
          </div>

          <div className="form-actions">
            <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowCancelModal(true)}      // back to Step 1
              >
                Cancel Sign Up!
            </button>

            <button 
              type="button" 
              className="btn-secondary" 
              onClick={handleBack}
            >
              Back
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              Confirm & Submit
            </button>

            <CancelModal
              isOpen={showCancelModal}
              onConfirm={() => navigate("/")}               // Navigate home
              onClose={() => setShowCancelModal(false)}
            />

          </div>
        </>
      )}
    </div>
  );
};

export default Step5Summary;
