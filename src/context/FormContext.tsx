import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { FormData, FormContextValue } from "../types/FormTypes";

const STORAGE_KEY = "bookBugFormData";

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  street: "",
  zipCode: "",
  city: "",
  purposeOfVisit: "",
  department: "",
  subscribeToNewsletter: false,
};

const FormContext = createContext<FormContextValue | undefined>(undefined);
export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initializeFormData = (): FormData => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as FormData;
      } catch (error) {
        console.error("Failed to parse stored form data", error);
      }
    }
    return defaultFormData;
  };

  const [formData, setFormData] = useState<FormData>(initializeFormData);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: FormContextValue = {
    formData,
    updateField,
    resetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext: () => FormContextValue = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
