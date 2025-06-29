import React from "react";
import FormGenerator from "../components/FormGenerator";
import { useCreateUserForm } from "../hooks/useCreateUserForm";
import { userValidationSchema } from "../utils/validations";

const CreateUser: React.FC = () => {
  const { formConfig } = useCreateUserForm();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Create User</h1>
          <p className="mt-2 text-sm text-gray-600">Fill in the form below to create a new user account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg rounded-lg p-8">
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
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">* Required fields must be filled</p>
          <p className="text-xs text-gray-500 mt-1">Password must contain only letters and numbers</p>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
