import { useQuery } from "@tanstack/react-query";
import { useGymStore } from "@/modules/gym/store/gym.store";
import { subscriptionService } from "../services/subscription.service";
import { Button, Card, PageHeader } from "@/shared/components";
import Subscriptions from "./Subscriptions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
  const { selectedGym } = useGymStore();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["subscriptions", selectedGym?.id, page],
    queryFn: () => subscriptionService.getSubscriptions(selectedGym?.id?.toString() ?? "", page),
    enabled: !!selectedGym?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-600)]" />
      </div>
    );
  }

  return (
    <div className="sm:px-6">
      <div className="sm:flex sm:items-center">
        <PageHeader title="Suscripciones">
          <Button leftIcon={<PlusIcon className="h-5 w-5" />} onClick={() => navigate("/subscriptions/create")}>
            Agregar suscripción
          </Button>
        </PageHeader>
      </div>
      <Card>
        {subscriptions && (
          <Subscriptions 
            subscriptions={subscriptions} 
            onPageChange={setPage}
          />
        )}
      </Card>
    </div>
  );
}
