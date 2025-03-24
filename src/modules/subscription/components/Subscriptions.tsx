import { Table } from "@/shared/components";
import type { Subscription } from "../types/subscription.types";

interface SubscriptionsProps {
  subscriptions: Subscription[];
}

export default function Subscriptions({ subscriptions }: SubscriptionsProps) {
  const columns = [
    {
      key: "member",
      header: "Nombre",
      cell: (subscription: Subscription) => subscription.member.name,
    },
    {
      key: "membership",
      header: "Membresia",
      cell: (subscription: Subscription) => subscription.membership.name,
    },
    {
      key: "start_date",
      header: "Fecha de inicio",
      cell: (subscription: Subscription) => subscription.start_date,
    },
    {
      key: "end_date",
      header: "Fecha de fin",
      cell: (subscription: Subscription) => subscription.end_date,
    },
  ];

  return (
    <Table
      columns={columns}
      data={subscriptions}
      emptyMessage="No hay suscripciones disponibles"
    />
  );
}
