import api from "@/shared/services/api.service";
import type { Membership } from "../types/membership.types";

export const membershipService = {
  getMemberships: async (gymId: string): Promise<Membership[]> => {
    const response = await api.get(`/api/gym/${gymId}/memberships`);
    return response.data;
  },
};
