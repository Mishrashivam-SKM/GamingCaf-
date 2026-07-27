import { useQuery } from './useQuery';
import { db } from '../../services/db';
import type { Product } from '../../types/models';

export function useProducts() {
  return useQuery<Product[]>(['products'], () => db.get('products'));
}
