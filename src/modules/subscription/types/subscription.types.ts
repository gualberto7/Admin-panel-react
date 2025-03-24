export interface Subscription {
  id: number;
  start_date: string;
  end_date: string;
  member: Member;
  membership: Membership;
}

type Member = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Membership = {
  id: number;
  name: string;
};
