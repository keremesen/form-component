import { FormField } from "./form.types";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field?: FormField;
  fieldProps?: any;
  fieldError?: string;
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onIconClick?: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}
