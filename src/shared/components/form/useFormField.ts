import { useFormContext } from "react-hook-form";
import get from "lodash/get";

export function useFormField(name: string) {
  const form = useFormContext();
  const error = get(form.formState.errors, name)?.message as string | undefined;

  return {
    field: form.register(name),
    error,
    form,
  };
}
