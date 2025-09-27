

type FormFieldStatus = {
  status: '';
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
}

export default function useStatus(): FormFieldStatus {

  const status = '';

  const errors = [];

  const warnings = [];

  return {
    status,
    errors,
    warnings,
  };
}
