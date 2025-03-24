import { Table } from "@/shared/components";
import type { Subscription } from "../types/subscription.types";
import type { PaginatedResponse } from "@/shared/types/pagination.types";

interface SubscriptionsProps {
  subscriptions: PaginatedResponse<Subscription>;
  onPageChange: (page: number) => void;
}

export default function Subscriptions({ subscriptions, onPageChange }: SubscriptionsProps) {
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
      data={subscriptions.data}
      emptyMessage="No hay suscripciones disponibles"
      pagination={{
        meta: subscriptions.meta,
        onPageChange,
      }}
    />
  );
}
