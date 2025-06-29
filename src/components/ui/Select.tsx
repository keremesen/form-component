import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  options?: SelectOption[];
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: any;
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  required,
  error,
  value,
  onChange,
  register,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        {...(register ? register(name) : {})}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
