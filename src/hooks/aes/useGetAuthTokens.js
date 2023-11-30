import { getAuthTokens } from '../../services/aes';
import { useQuery } from 'react-query';
import { queryKeys } from '../../constants';
import { useAppData } from '../../providers/AppDataProvider';

export const useGetAuthTokens = () => {
  const { loading } = useAppData();
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(queryKeys.AES_AUTH_TOKEN, getAuthTokens, { enabled: !loading });
  return {
    refresh: refetch,
    loading: !data || isLoading || isFetching,
    authTokens: data,
  };
};
