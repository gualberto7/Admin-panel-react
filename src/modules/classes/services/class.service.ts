import api from "../../../shared/services/api.service";
import { GymClass } from "../types/class.types";

const CLASS_API = "/classes";

export const classService = {
  getAll: () => api.get<GymClass[]>(CLASS_API),

  getById: (id: number) => api.get<GymClass>(`${CLASS_API}/${id}`),

  create: (data: Omit<GymClass, "id">) => api.post<GymClass>(CLASS_API, data),

  update: (id: number, data: Partial<GymClass>) =>
    api.put<GymClass>(`${CLASS_API}/${id}`, data),

  delete: (id: number) => api.delete(`${CLASS_API}/${id}`),

  updateSchedule: (
    classId: number,
    scheduleId: number,
    data: Partial<GymClass>
  ) => api.put(`${CLASS_API}/${classId}/schedules/${scheduleId}`, data),
};
