import { useQuery } from './useQuery';
import { useMutation } from './useMutation';
import { db } from '../../services/db';
import type { Settings } from '../../types/models';

export function useSettings() {
  return useQuery<Settings>(['settings'], () => db.getSettings());
}

export function useUpdateSettings() {
  return useMutation<Settings, Partial<Settings>>(
    async (variables) => {
      return db.updateSettings(variables);
    }
  );
}
