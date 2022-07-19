export interface Order {
  id: string;
  patrimony: string;
  when: string;
  status: 'opened' | 'closed';
}
