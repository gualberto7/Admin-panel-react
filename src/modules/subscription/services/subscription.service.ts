import api from "@/shared/services/api.service";
import type { Subscription } from "../types/subscription.types";
import type { PaginatedResponse } from "@/shared/types/pagination.types";

export const subscriptionService = {
  getSubscriptions: async (
    gymId: string,
    page: number = 1
  ): Promise<PaginatedResponse<Subscription>> => {
    const response = await api.get(
      `/api/gym/${gymId}/subscriptions?page=${page}`
    );
    return response.data;
  },
};
