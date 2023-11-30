import { useMutation, useQueryClient } from 'react-query';
import { updateAuthTokens } from '../../services/aes';
import { queryKeys } from '../../constants';

export const useUpdateAuthTokens = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(
    (authTokens) => updateAuthTokens(authTokens),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.AES_AUTH_TOKEN),
    }
  );
  return {
    inProgress: isLoading,
    update: mutateAsync,
  };
};
