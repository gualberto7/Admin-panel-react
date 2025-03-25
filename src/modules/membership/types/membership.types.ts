export interface Membership {
  id?: number;
  name: string;
  price: number | null;
  duration: number | null;
  duration_unit: DurationUnit;
  max_checkins?: number | null;
  description?: string;
  active: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type DurationUnit = "day" | "month";
