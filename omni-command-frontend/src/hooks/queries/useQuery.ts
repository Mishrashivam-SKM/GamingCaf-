import { useState, useEffect, useCallback } from 'react';

interface UseQueryOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const queryKeyString = JSON.stringify(queryKey);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await queryFn();
      setData(result);
      if (options?.onSuccess) options.onSuccess(result);
    } catch (err: any) {
      setError(err);
      if (options?.onError) options.onError(err);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFn, options?.onSuccess, options?.onError]);

  useEffect(() => {
    if (options?.enabled !== false) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch, options?.enabled, queryKeyString]);

  return { data, isLoading, error, refetch: fetch };
}
