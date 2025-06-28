export interface FormField {
  name: string;
  type: "text" | "email" | "password" | "checkbox" | "select" | "textarea";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onIconClick?: () => void;
}

export interface ButtonConfig {
  text?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export interface FormConfig {
  fields: FormField[];
  onSubmit: (data: any) => void;
  submitButton?: ButtonConfig;
  resetButton?: ButtonConfig;
  showResetButton?: boolean;
  resetAfterSubmit?: boolean;
  customButtons?: Array<{
    id: string;
    config: ButtonConfig;
    onClick: (formData?: any) => void;
    position?: "before" | "after";
  }>;
}

export interface FormGeneratorProps {
  config: FormConfig;
  mode?: "controlled" | "uncontrolled";
  defaultValues?: Record<string, any>;
  className?: string;
}