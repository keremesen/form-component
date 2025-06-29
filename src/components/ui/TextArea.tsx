import React from 'react';

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  register?: any;
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  required,
  error,
  rows = 4,
  value,
  onChange,
  register
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...(register ? register(name) : {})}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};