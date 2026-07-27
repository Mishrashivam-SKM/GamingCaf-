import { useState, useCallback } from 'react';

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}

export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TVariables>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await mutationFn(variables);
        if (options?.onSuccess) options.onSuccess(result, variables);
        return result;
      } catch (err: any) {
        setError(err);
        if (options?.onError) options.onError(err, variables);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options]
  );

  return { mutate, isLoading, error };
}
