import api from "@/shared/services/api.service";
import { Member } from "../types/member.types";

export const memberService = {
  getMembers: async () => {
    const response = await api.get(`/api/members`);
    return response.data;
  },
  getMemberByCi: async (memberCi: string) => {
    const response = await api.get(`/api/members/ci/${memberCi}`);
    return response.data;
  },
  createMember: async (member: Member) => {
    const response = await api.post(`/api/members`, member);
    return response.data;
  },
};
