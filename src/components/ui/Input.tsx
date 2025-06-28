import { forwardRef } from "react";
import { InputProps } from "../../types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required,
      helperText,
      icon,
      iconPosition = "right",
      onIconClick,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputClasses = `
      w-full px-4 py-2 border rounded-lg transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      ${icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
      ${
        error
          ? "border-red-500 bg-red-50 text-red-900 placeholder-red-400"
          : "border-gray-300 bg-white hover:border-gray-400"
      }
      ${className}
    `.trim();

    const iconButtonClasses = `
  absolute inset-y-0 flex items-center px-3 text-gray-500
  ${iconPosition === "left" ? "left-0" : "right-0"}
  ${
    onIconClick
      ? "hover:scale-110 cursor-pointer hover:text-black transition-transform duration-200"
      : "cursor-default"
  }
`.trim();

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <button type="button" onClick={onIconClick} className={iconButtonClasses} tabIndex={-1}>
              {icon}
            </button>
          )}

          <input
            ref={ref}
            className={inputClasses}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.name}-error` : undefined}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <button type="button" onClick={onIconClick} className={iconButtonClasses} tabIndex={-1}>
              {icon}
            </button>
          )}
        </div>

        {error && (
          <p id={`${props.name}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
