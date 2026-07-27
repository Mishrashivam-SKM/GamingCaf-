import { useQuery } from './useQuery';
import { db } from '../../services/db';
import type { Session } from '../../types/models';

export function useSessions() {
  return useQuery<Session[]>(['sessions'], () => db.get('sessions'));
}
