import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useGymStore } from "@/modules/gym/store/gym.store";
import { Button, Card, Form, PageHeader } from "@/shared/components";
import { useFormField } from "@/shared/components/form/useFormField";
import FormField, { SelectField } from "@/shared/components/form/FormField";
import { membershipService } from "@/modules/membership/services/membership.service";

const subscriptionSchema = z.object({
  member_id: z.string().min(1, "El nombre es requerido"),
  membership_id: z.string().min(1, "La membresía es requerida"),
  start_date: z.string().min(1, "La fecha de inicio es requerida"),
  end_date: z.string().min(1, "La fecha de fin es requerida"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function SubscriptionForm() {
  const { selectedGym } = useGymStore();
  const { data: memberships } = useQuery({
    queryKey: ["memberships", selectedGym?.id],
    queryFn: () =>
      membershipService.getMemberships(selectedGym?.id?.toString() ?? ""),
    enabled: !!selectedGym?.id,
  });

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  name="member_id"
                  label="Cliente"
                  placeholder="Buscar por CI"
                />

                <SelectWrapper name="membership_id" label="Membresía">
                  <option value="">Selecciona una membresía</option>
                  {memberships?.map((membership) => (
                    <option key={membership.id} value={membership.id}>
                      {membership.name} - {membership.price} Bs.
                    </option>
                  ))}
                </SelectWrapper>

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

function SelectWrapper({
  name,
  ...props
}: { name: keyof SubscriptionFormData } & React.ComponentProps<
  typeof SelectField
>) {
  const { field, error } = useFormField(name);
  return <SelectField {...field} error={error} {...props} />;
}
