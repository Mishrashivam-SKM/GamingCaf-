import { useQuery } from './useQuery';
import { db } from '../../services/db';
import type { Customer } from '../../types/models';

export function useCustomers() {
  return useQuery<Customer[]>(['customers'], () => db.get('customers'));
}
