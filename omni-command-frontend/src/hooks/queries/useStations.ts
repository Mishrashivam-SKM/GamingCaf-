import { useQuery } from './useQuery';
import { db } from '../../services/db';
import type { Station } from '../../types/models';

export function useStations() {
  return useQuery<Station[]>(['stations'], () => db.get('stations'));
}
