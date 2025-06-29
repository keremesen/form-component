# Form Component

A powerful, flexible React form component built with TypeScript, React Hook Form, and Tailwind CSS. This project demonstrates clean architecture principles, accessibility-first design, and provides a comprehensive solution for dynamic form generation.

## 🚀 Features

- **Dynamic Form Generation**: Automatically generates forms based on field configuration
- **Dual Mode Support**: Both controlled and uncontrolled form modes
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Rich Input Types**: Support for text, email, password, select, textarea, checkbox, and more
- **Advanced Button System**: Customizable submit, reset, and custom buttons with positioning
- **Smart Validation**: Automatic Yup schema generation or custom schema support
- **Error Handling**: Field-level error display with accessibility support
- **Custom Hook Integration**: Pre-built hooks like `useCreateUserForm` for rapid development
- **Clean Architecture**: Follows SOLID principles and clean code practices
- **Accessibility First**: WCAG compliant with proper ARIA attributes and keyboard navigation

## 🏗️ Architecture

### FormGenerator Component Features

- **Dynamic Field Rendering**: Automatically renders appropriate input components based on field type
- **Dual Mode Support**: Both controlled and uncontrolled modes with React Hook Form
- **Error Handling**: Comprehensive error display with field-level validation
- **Custom Buttons**: Support for submit, reset, and custom buttons with flexible positioning
- **Icon Support**: Left/right icon positioning with click handlers
- **Loading States**: Built-in loading states for form submission
- **Auto-complete Support**: HTML5 autocomplete attributes for better UX
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Custom Hooks

- **useCreateUserForm**: Pre-configured hook for user creation forms with validation
- **Extensible Hook System**: Easy to create new hooks for different form types

### Validation System

- **Automatic Schema Generation**: `createValidationSchema` utility automatically generates Yup schemas based on form field configurations
- **Custom Schema Support**: Freedom to provide your own Yup validation schemas
- **Field-Level Validation**: Real-time validation with error display

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/keremesen/form-component
cd form-component

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Usage

### Basic Form Creation

```tsx
import FormGenerator from './components/FormGenerator';
import { useCreateUserForm } from './hooks/useCreateUserForm';
import { userValidationSchema } from './utils/validations';

function CreateUserPage() {
  const { formConfig } = useCreateUserForm();
  
  return (
    <FormGenerator
      config={formConfig}
      mode="uncontrolled"
      defaultValues={{
        fullname: "",
        email: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={userValidationSchema}
      className="space-y-6"
    />
  );
}
```

### Controlled vs Uncontrolled Forms

#### Controlled Form
```tsx
<FormGenerator
  config={formConfig}
  mode="controlled"
  defaultValues={initialData}
  validationSchema={customSchema}
  className="space-y-4"
/>
```

#### Uncontrolled Form (Default)
```tsx
<FormGenerator
  config={formConfig}
  mode="uncontrolled"
  defaultValues={{
    fullname: "",
    email: "",
    password: "",
    rememberMe: false,
  }}
  validationSchema={userValidationSchema}
/>
```
### Field Configuration Examples

```tsx
const fields = [
  {
    name: 'fullname',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    validation: {
      min: 2,
      max: 50,
      message: 'Full name must be between 2 and 50 characters'
    }
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    autoComplete: 'email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
    icon: <EyeIcon />,
    iconPosition: 'right',
    onIconClick: togglePasswordVisibility,
    validation: {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Password must contain only letters and numbers'
    }
  },
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    required: true,
    options: [
      { value: 'us', label: 'United States' },
      { value: 'tr', label: 'Turkey' },
      { value: 'uk', label: 'United Kingdom' }
    ]
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    validation: {
      max: 500,
      message: 'Biography cannot exceed 500 characters'
    }
  },
  {
    name: 'rememberMe',
    type: 'checkbox',
    label: 'Remember Me',
    required: false
  }
];
```

### Creating Custom Form Hooks

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormConfig } from "../types";
import { User } from "../types";
import EyeSlashIcon from "../assets/eye-slash.svg";

export const useCreateUserForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  async function handleSubmit(data: User) {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/user-detail");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  }

  // Form configuration for user creation
  const formConfig: FormConfig = {
    fields: [
      {
        name: "fullname",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        autoComplate: "name",
        required: true,
        validation: {
          min: 2,
          max: 50,
        },
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email address",
        autoComplate: "email",
        required: true,
      },
      {
        name: "password",
        type: showPassword ? "text" : "password",
        label: "Password",
        placeholder: "Enter alphanumeric password",
        autoComplate: "new-password",
        icon: <img src={EyeSlashIcon} alt="ShowPassword" className="h-5 w-5" />,
        onIconClick: togglePasswordVisibility,
        required: true,
        validation: {
          pattern: alphanumericRegex,
          message: "Password must contain only letters and numbers",
          min: 6,
        },
      },
      {
        name: "rememberMe",
        type: "checkbox",
        label: "Remember Me",
        required: false,
      },
    ],
    onSubmit: handleSubmit,
    submitButton: {
      text: "Create User",
      variant: "primary" as const,
    },
    resetAfterSubmit: true,
  };

  return {
    formConfig,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
  };
};
```

## 🧩 Extensibility

### Supported Input Types

The FormGenerator supports all these input types out of the box:

```typescript
type InputType =
  | "text" | "email" | "password" | "number" | "tel" | "url" | "search"
  | "date" | "datetime-local" | "time" | "month" | "week" | "color" | "range"
  | "file" | "hidden" | "checkbox" | "radio" | "select" | "textarea";
```

### Adding New Input Types

1. Add the new input type to the `InputType` union in `types/index.ts`
2. Create a new input component in `components/ui/`
3. Update the `renderField` method in `FormGenerator.tsx`
4. Add validation rules in `utils/validations.ts`

### Field Validation Options

```typescript
interface FormField {
  name: string;
  type: InputType;
  label: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  options?: Array<{ value: string; label: string }>; // for select/radio
  multiple?: boolean; // for file/select
  accept?: string; // for file input
  step?: number | string; // for number/range
  validation?: {
    pattern?: RegExp;
    message?: string;
    min?: number | string;
    max?: number | string;
  };
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onIconClick?: () => void;
}
```

### Button Configuration Options

```typescript
interface ButtonConfig {
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
```

## 🎨 Styling

The project uses Tailwind CSS for styling with a focus on:
- Consistent design system
- Responsive layouts
- Accessibility compliance

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **Error Announcements**: Validation errors are properly announced
- **Color Contrast**: WCAG AA compliant color combinations

## 📁 Project Structure

```
src/
├── components/
│   ├── FormGenerator.tsx       # Main form component
│   └── ui/
│       ├── Input.tsx          # Text input component
│       ├── Button.tsx         # Button component
│       ├── Checkbox.tsx       # Checkbox component
│       ├── Select.tsx         # Select dropdown component
│       ├── TextArea.tsx       # Textarea component
│       └── index.ts           # UI components barrel export
├── hooks/
│   └── useCreateUserForm.ts   # User form configuration hook
├── utils/
│   └── validations.ts         # Validation schema utilities
├── types/
│   └── index.ts              # TypeScript type definitions
├── pages/
│   ├── CreateUser.tsx        # User creation page
│   └── UserDetail.tsx        # User data detail page
└── App.tsx                   # Main application component
```

Built with ❤️ using React, TypeScript, React Hook Form, and Tailwind CSS.
