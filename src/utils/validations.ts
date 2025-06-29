import * as yup from "yup";
import { FormField } from "../types";

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const alphanumericRegex = /^[a-zA-Z0-9çÇğĞüÜöÖşŞıİ]+$/;

export const userValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),

  email: yup.string().required("Email is required").matches(emailRegex, "Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(alphanumericRegex, "Password must contain only letters and numbers"),

  rememberMe: yup.boolean(),
});

// Generic validation function for custom fields
export const createValidationSchema = (fields: FormField[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    const { type, label, required, validation } = field;
    let validator: any;

    if (type === "checkbox") {
      shape[field.name] = yup.boolean();
      return;
    }

    if (type === "number" || type === "range") {
      validator = yup.number().typeError(`${label} must be a number`);

      if (validation?.min !== undefined) {
        validator = validator.min(validation.min, `${label} must be at least ${validation.min}`);
      }

      if (validation?.max !== undefined) {
        validator = validator.max(validation.max, `${label} must be at most ${validation.max}`);
      }
    }

    else if (type === "date") {
      validator = yup.date().typeError(`${label} must be a valid date`);

      if (validation?.min) {
        validator = validator.min(new Date(validation.min), `${label} must be after ${validation.min}`);
      }

      if (validation?.max) {
        validator = validator.max(new Date(validation.max), `${label} must be before ${validation.max}`);
      }
    }

    else if (type === "email") {
      validator = yup.string().matches(emailRegex, "Please enter a valid email address");
    }

    // All other types (text, password, textarea, etc.)
    else {
      validator = yup.string();

      if (validation?.min !== undefined) {
        validator = validator.min(validation.min, `${label} must be at least ${validation.min} characters`);
      }

      if (validation?.max !== undefined) {
        validator = validator.max(validation.max, `${label} must be at most ${validation.max} characters`);
      }
    }

    // Custom pattern
    if (validation?.pattern) {
      validator = validator.matches(validation.pattern, validation.message || "Invalid format");
    }

    // Required
    if (required) {
      validator = validator.required(`${label} is required`);
    }

    shape[field.name] = validator;
  });

  return yup.object().shape(shape);
};
