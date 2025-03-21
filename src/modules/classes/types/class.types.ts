export interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ClassSchedule {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  capacity: number;
  currentAttendees: number;
}

export interface GymClass {
  id: number;
  name: string;
  description: string;
  trainer: Trainer;
  schedules: ClassSchedule[];
  type: "strength" | "cardio" | "flexibility" | "hiit" | "yoga" | "other";
  difficulty: "beginner" | "intermediate" | "advanced";
  image?: string;
}
