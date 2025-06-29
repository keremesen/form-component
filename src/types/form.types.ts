import * as yup from "yup";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "time"
  | "month"
  | "week"
  | "color"
  | "range"
  | "file"
  | "hidden"
  | "checkbox"
  | "radio"
  | "select"
  | "textarea";

export interface FormField {
  name: string;
  type: InputType;
  label: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  options?: Array<{ value: string; label: string }>; // select and radio
  multiple?: boolean; // file and select
  accept?: string; // file
  step?: number | string; // number, range
  validation?: {
    pattern?: RegExp;
    message?: string;
    min?: number | string; // string length, number value, or date
    max?: number | string;
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
  validationSchema?: yup.ObjectSchema<any>;
}
