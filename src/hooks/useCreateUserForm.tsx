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
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email address",
        required: true,
      },
      {
        name: "password",
        type: showPassword ? "text" : "password",
        label: "Password",
        placeholder: "Enter alphanumeric password",
        icon: <img src={EyeSlashIcon} alt="ShowPassword" className="h-5 w-5" />,
        onIconClick: togglePasswordVisibility,
        required: true,
        validation: {
          pattern: alphanumericRegex,
          message: "Password must contain only letters and numbers",
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
