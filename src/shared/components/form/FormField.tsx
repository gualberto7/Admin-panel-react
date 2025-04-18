import { ComponentProps, forwardRef } from "react";
import clsx from "clsx";

interface FormFieldProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  description?: string;
}

interface SelectFieldProps extends ComponentProps<"select"> {
  label?: string;
  error?: string;
  description?: string;
}

const baseFieldClasses =
  "block w-full rounded-md border-0 py-1.5 text-[var(--color-gray-900)] shadow-sm ring-1 ring-inset placeholder:text-[var(--color-gray-400)] focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6";

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-[var(--color-gray-700)]"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            baseFieldClasses,
            error
              ? "ring-[var(--color-error-300)] focus:ring-[var(--color-error-500)]"
              : "ring-[var(--color-gray-300)] focus:ring-[var(--color-primary-600)]",
            className
          )}
          {...props}
        />
        {description && (
          <p className="text-sm text-[var(--color-gray-500)]">{description}</p>
        )}
        {error && (
          <p className="text-sm text-[var(--color-error-600)]">{error}</p>
        )}
      </div>
    );
  }
);

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-[var(--color-gray-700)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            baseFieldClasses,
            error
              ? "ring-[var(--color-error-300)] focus:ring-[var(--color-error-500)]"
              : "ring-[var(--color-gray-300)] focus:ring-[var(--color-primary-600)]",
            className
          )}
          {...props}
        />
        {description && (
          <p className="text-sm text-[var(--color-gray-500)]">{description}</p>
        )}
        {error && (
          <p className="text-sm text-[var(--color-error-600)]">{error}</p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
FormField.displayName = "FormField";

export default FormField;
