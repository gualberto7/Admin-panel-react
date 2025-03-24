import api from "@/shared/services/api.service";
import type { Subscription } from "../types/subscription.types";
import type { PaginatedResponse } from "@/shared/types/pagination.types";

export const subscriptionService = {
  getSubscriptions: async (
    gymId: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<PaginatedResponse<Subscription>> => {
    const response = await api.get(
      `/api/gym/${gymId}/subscriptions?page[size]=${perPage}&page[number]=${page}`
    );
    return response.data;
  },
};
