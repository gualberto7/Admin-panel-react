import {
  useForm,
  FormProvider,
  UseFormProps,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: SubmitHandler<z.infer<T>>;
  form?: UseFormReturn<z.infer<T>>;
  formProps?: UseFormProps<z.infer<T>>;
  children: (form: UseFormReturn<z.infer<T>>) => React.ReactNode;
  className?: string;
}

export default function Form<T extends z.ZodType>({
  schema,
  onSubmit,
  children,
  form: externalForm,
  formProps,
  className,
}: FormProps<T>) {
  const form = externalForm || useForm<z.infer<T>>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children(form)}
      </form>
    </FormProvider>
  );
} 