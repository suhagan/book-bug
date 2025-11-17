export interface FormData {
  // for Step 1 – Personal Data
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;

  // for Step 2 – Contact Data
  email: string;
  phone: string;

  // for Step 3 – Address
  street: string;
  zipCode: string;
  city: string;

  // for Step 4 – Visit
  purposeOfVisit: string;
  department: string;

  // for Step 5 – Summary
  subscribeToNewsletter: boolean;
}

export interface FormContextValue {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  resetForm: () => void;
}
