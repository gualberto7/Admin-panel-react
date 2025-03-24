import { useQuery } from "@tanstack/react-query";
import { useGymStore } from "@/modules/gym/store/gym.store";
import { subscriptionService } from "../services/subscription.service";
import PageHeader from "@/shared/components/PageHeader";

export default function SubscriptionPage() {
  const { selectedGym } = useGymStore();

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["subscriptions", selectedGym?.id],
    queryFn: () => subscriptionService.getSubscriptions(selectedGym?.id?.toString() ?? ""),
    enabled: !!selectedGym?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-600)]" />
      </div>
    );
  }

  if (!selectedGym) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[var(--color-gray-500)]">Selecciona un gimnasio para ver sus suscripciones</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <PageHeader title="Suscripciones">
          <button className="btn-primary">Agregar suscripción</button>
        </PageHeader>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-[var(--color-gray-300)]">
                <thead className="bg-[var(--color-gray-50)]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[var(--color-gray-900)] sm:pl-6"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[var(--color-gray-900)]"
                    >
                      Membresia
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[var(--color-gray-900)]"
                    >
                      Fecha de inicio
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[var(--color-gray-900)]"
                    >
                      Fecha de fin
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[var(--color-gray-900)]"
                    >
                      Estado
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-gray-200)] bg-white">
                  {subscriptions?.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[var(--color-gray-900)] sm:pl-6">
                        {subscription.member.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[var(--color-gray-500)]">
                        {subscription.membership.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[var(--color-gray-500)]">
                        ${subscription.start_date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[var(--color-gray-500)]">
                        {subscription.end_date} días
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            subscription.isActive
                              ? "bg-[var(--color-success-50)] text-[var(--color-success-700)]"
                              : "bg-[var(--color-error-50)] text-[var(--color-error-700)]"
                          }`}
                        >
                          {subscription.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
