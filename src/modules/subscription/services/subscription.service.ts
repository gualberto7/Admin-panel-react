import api from "@/shared/services/api.service";
import type { Subscription } from "../types/subscription.types";

export const subscriptionService = {
  getSubscriptions: async (gymId: string): Promise<Subscription[]> => {
    const response = await api.get(`/api/gym/${gymId}/subscriptions`);
    return response.data.data;
  },
};
