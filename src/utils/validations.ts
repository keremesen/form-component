import * as yup from 'yup';


export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const alphanumericRegex = /^[a-zA-Z0-9çÇğĞüÜöÖşŞıİ]+$/;

export const userValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(alphanumericRegex, 'Password must contain only letters and numbers'),
  
  rememberMe: yup.boolean()
});

// Generic validation function for custom fields
export const createValidationSchema = (fields: any[]) => {
  const shape: any = {};
  
  fields.forEach((field) => {
    let validator = yup.string();
    
    if (field.type === 'email') {
      validator = validator.matches(emailRegex, 'Please enter a valid email address');
    }
    
    if (field.type === 'password' && field.validation?.pattern) {
      validator = validator.matches(field.validation.pattern, field.validation.message || 'Invalid format');
    }
    
    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }
    
    if (field.type === 'checkbox') {
      shape[field.name] = yup.boolean();
    } else {
      shape[field.name] = validator;
    }
  });
  
  return yup.object().shape(shape);
};