import React from 'react';

interface CheckboxProps {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  register?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  required,
  error,
  checked,
  onChange,
  register
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        {...(register ? register(name) : {})}
        type="checkbox"
        id={name}
        checked={checked}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};