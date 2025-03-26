import { forwardRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { memberService } from "@/modules/members/services/member.service";

interface SearchFieldProps {
  label?: string;
  error?: string;
  description?: string;
  onSelect?: (value: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      label,
      error,
      description,
      className,
      onSelect,
      value = "",
      onChange,
      ...props
    },
    ref
  ) => {
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [displayValue, setDisplayValue] = useState(value);

    const { data: member, isLoading } = useQuery({
      queryKey: ["member", debouncedSearch],
      queryFn: () => memberService.getMemberByCi(debouncedSearch),
      enabled: /^\d{7,8}$/.test(debouncedSearch),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
      console.log("member", member);
      console.log("displayValue", displayValue);
      if (member) {
        setDisplayValue(member.ci);
        onSelect?.(member.id);
      }
      console.log("displayValue", displayValue);
    }, [member]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setDisplayValue(newValue);
      onChange?.(e);

      // Solo actualizar la búsqueda si es un CI válido
      if (/^\d{7,8}$/.test(newValue)) {
        setDebouncedSearch(newValue);
      }
    };

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
        <div className="relative">
          <input
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            className={clsx(
              "block w-full rounded-md border-0 py-1.5 text-[var(--color-gray-900)] shadow-sm ring-1 ring-inset placeholder:text-[var(--color-gray-400)] focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
              error
                ? "ring-[var(--color-error-300)] focus:ring-[var(--color-error-500)]"
                : "ring-[var(--color-gray-300)] focus:ring-[var(--color-primary-600)]",
              className
            )}
            {...props}
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-primary-600)]" />
            </div>
          )}
        </div>
        {description && (
          <p className="text-sm text-[var(--color-gray-500)]">{description}</p>
        )}
        {error && (
          <p className="text-sm text-[var(--color-error-600)]">{error}</p>
        )}
        {displayValue &&
          !isLoading &&
          !member &&
          /^\d{7,8}$/.test(displayValue) && (
            <p className="text-sm text-[var(--color-error-600)]">
              No se encontró ningún miembro con este CI
            </p>
          )}
        {member && (
          <p className="text-sm text-[var(--color-success-600)]">
            {member.name} | {member.phone}
          </p>
        )}
      </div>
    );
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
