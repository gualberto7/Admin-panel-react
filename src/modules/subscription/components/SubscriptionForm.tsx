import { z } from "zod";
import FormField from "@/shared/components/form/FormField";
import { Button, Card, Form, PageHeader } from "@/shared/components";
import { useFormField } from "@/shared/components/form/useFormField";

const subscriptionSchema = z.object({
  member_id: z.string().min(1, "El nombre es requerido"),
  membership_id: z.string().min(1, "La membresía es requerida"),
  start_date: z.string().date(),
  end_date: z.string().date(),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function SubscriptionForm() {
  const handleSubmit = (data: SubscriptionFormData) => {
    console.log(data);
  };

  return (
    <>
      <PageHeader title="Crear suscripción" />
      <Card>
        <Form
          schema={subscriptionSchema}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {() => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field name="member_id" label="Miembro" />
                <Field name="membership_id" label="Membresía" />
                <Field name="start_date" label="Fecha de inicio" type="date" />
                <Field name="end_date" label="Fecha de fin" type="date" />
              </div>

              <Button type="submit">Guardar</Button>
            </>
          )}
        </Form>
      </Card>
    </>
  );
}

function Field({
  name,
  ...props
}: { name: keyof SubscriptionFormData } & React.ComponentProps<
  typeof FormField
>) {
  const { field, error } = useFormField(name);
  return <FormField {...field} error={error} {...props} />;
}
