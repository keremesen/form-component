import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FormGeneratorProps, FormField, ButtonConfig } from "../types";
import { createValidationSchema } from "../utils/validations";
import { Checkbox, Select, TextArea } from "./ui";

/**
 * FormGenerator - A reusable form component that dynamically generates forms
 * based on configuration. Supports both controlled and uncontrolled inputs.
 *
 * Features:
 * - Dynamic field generation
 * - Built-in validation with Yup
 * - Error handling and display
 * - Support for multiple input types
 * - Customizable buttons (submit, reset, custom)
 * - SOLID principles compliance
 * - TypeScript support
 *
 * @example
 * // Basic usage
 * <FormGenerator config={formConfig} />
 *
 * // With custom buttons
 * <FormGenerator
 *   config={{
 *     ...formConfig,
 *     submitButton: { text: 'Save', variant: 'primary', icon: <SaveIcon /> },
 *     showResetButton: true,
 *     resetButton: { text: 'Clear', variant: 'outline' },
 *     customButtons: [
 *       {
 *         id: 'draft',
 *         config: { text: 'Save as Draft', variant: 'secondary' },
 *         onClick: (data) => saveDraft(data),
 *         position: 'before'
 *       }
 *     ]
 *   }}
 * />
 */
const FormGenerator: React.FC<FormGeneratorProps> = ({
  config,
  mode = "uncontrolled",
  defaultValues = {},
  className = "",
  validationSchema,
}) => {
  const schema = validationSchema || createValidationSchema(config.fields);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (data: any) => {
    try {
      await config.onSubmit(data);
      if (config.resetAfterSubmit) {
        reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleCustomButtonClick = (customButton: any) => {
    const currentFormData = getValues();
    customButton.onClick(currentFormData);
  };

  /**
   * Renders a button with custom configuration
   */
  const renderButton = (
    buttonConfig: ButtonConfig,
    onClick: () => void,
    type: "button" | "submit" = "button"
  ) => {
    return (
      <Button
        type={type}
        variant={buttonConfig.variant}
        size={buttonConfig.size}
        className={buttonConfig.className}
        disabled={buttonConfig.disabled || (type === "submit" && isSubmitting)}
        loading={buttonConfig.loading || (type === "submit" && isSubmitting)}
        fullWidth={buttonConfig.fullWidth}
        onClick={type === "button" ? onClick : undefined}
        icon={buttonConfig.icon}
        iconPosition={buttonConfig.iconPosition}
      >
        {buttonConfig.text}
      </Button>
    );
  };

  /**
   * Renders custom buttons based on position
   */
  const renderCustomButtons = (position: "before" | "after") => {
    if (!config.customButtons) return null;

    return config.customButtons
      .filter((button) => button.position === position)
      .map((button) => (
        <div key={button.id}>{renderButton(button.config, () => handleCustomButtonClick(button))}</div>
      ));
  };

  /**
   * Renders a single form field based on its configuration
   */

  const renderField = (field: FormField) => {
    const fieldError = errors[field.name]?.message as string;

    // Controlled mode using Controller
    if (mode === "controlled") {
      return (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: controllerField }) => (
            <div>
              {field.type === "checkbox" ? (
                <Checkbox
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  error={fieldError}
                  checked={controllerField.value || false}
                  onChange={(checked) => controllerField.onChange(checked)}
                />
              ) : field.type === "select" ? (
                <Select
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  required={field.required}
                  error={fieldError}
                  value={controllerField.value}
                  onChange={(value) => controllerField.onChange(value)}
                />
              ) : field.type === "textarea" ? (
                <TextArea
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  error={fieldError}
                  value={controllerField.value}
                  onChange={(value) => controllerField.onChange(value)}
                />
              ) : (
                <Input
                  {...controllerField}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  icon={field.icon}
                  onIconClick={field.onIconClick}
                  required={field.required}
                  error={fieldError}
                  autoComplete={field.autoComplete}
                />
              )}
            </div>
          )}
        />
      );
    }

    // Uncontrolled mode using register
    if (field.type === "checkbox") {
      return (
        <Checkbox
          key={field.name}
          name={field.name}
          label={field.label}
          required={field.required}
          error={fieldError}
          register={register}
        />
      );
    }

    if (field.type === "select") {
      return (
        <Select
          key={field.name}
          name={field.name}
          label={field.label}
          options={field.options}
          required={field.required}
          error={fieldError}
          register={register}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <TextArea
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          error={fieldError}
          register={register}
        />
      );
    }

    return (
      <Input
        key={field.name}
        {...register(field.name)}
        type={field.type}
        label={field.label}
        placeholder={field.placeholder}
        icon={field.icon}
        onIconClick={field.onIconClick}
        required={field.required}
        error={fieldError}
        autoComplete={field.autoComplete}
      />
    );
  };

  // Default button configurations
  const defaultSubmitButton: ButtonConfig = {
    text: config.submitButton?.text || "Submit",
    variant: "primary",
    fullWidth: true,
    ...config.submitButton,
  };

  const defaultResetButton: ButtonConfig = {
    text: "Reset",
    variant: "outline",
    ...config.resetButton,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`} noValidate>
      {config.fields.map(renderField)}

      <div className="pt-4 space-y-3">
        {/* Custom buttons before main buttons */}
        {renderCustomButtons("before")}

        {/* Main buttons container */}
        <div className={`flex gap-3 ${config.showResetButton ? "flex-row" : ""}`}>
          {/* Reset button */}
          {config.showResetButton && (
            <div className={defaultResetButton.fullWidth ? "flex-1" : ""}>
              {renderButton(defaultResetButton, handleReset)}
            </div>
          )}

          {/* Submit button */}
          <div className={defaultSubmitButton.fullWidth && !config.showResetButton ? "w-full" : "flex-1"}>
            {renderButton(defaultSubmitButton, () => {}, "submit")}
          </div>
        </div>

        {/* Custom buttons after main buttons */}
        {renderCustomButtons("after")}
      </div>
    </form>
  );
};

export default FormGenerator;
