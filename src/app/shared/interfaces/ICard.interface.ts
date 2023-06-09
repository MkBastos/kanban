export interface ICard {
  id?: string;
  title: string;
  description: string;
  owner: string;
  status?: string;
  createdAt?: string;
  finishedAt?: string;
  duration?: string;
  deadline?: string;
  sla?: string;
}
