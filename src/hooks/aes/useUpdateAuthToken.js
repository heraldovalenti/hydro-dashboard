import { useMutation, useQueryClient } from 'react-query';
import { updateAuthToken } from '../../services/aes';
import { queryKeys } from '../../constants';

export const useUpdateAuthToken = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(
    (token) => updateAuthToken(token),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.AES_AUTH_TOKEN),
    }
  );
  return {
    inProgress: isLoading,
    update: mutateAsync,
  };
};
