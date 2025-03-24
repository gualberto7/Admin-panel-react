import { useQuery } from "@tanstack/react-query";
import { useGymStore } from "@/modules/gym/store/gym.store";
import { subscriptionService } from "../services/subscription.service";
import { Button, Card, PageHeader } from "@/shared/components";
import Subscriptions from "./Subscriptions";
import { PlusIcon } from "@heroicons/react/24/outline";

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
      <div className="sm:flex sm:items-center mb-4">
        <PageHeader title="Suscripciones">
          <Button leftIcon={<PlusIcon className="h-5 w-5" />}>
            Agregar suscripción
          </Button>
        </PageHeader>
      </div>
      <Card>
        <Subscriptions subscriptions={subscriptions ?? []} />
      </Card>
    </div>
  );
}
