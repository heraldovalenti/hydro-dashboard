import { useState, useEffect } from 'react';
import { useAppData } from '../../providers/AppDataProvider';
import { updateAesObservations } from '../../services/aes';
import { statusCodes } from './statusCodes';

export const useUpdateAesObservations = () => {
  const { loading: appLoading } = useAppData();
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(statusCodes.NONE);
  useEffect(() => {
    const update = async () => {
      try {
        await updateAesObservations();
        setStatus(statusCodes.OK);
      } catch (error) {
        if (error.response?.status === 403) {
          setStatus(statusCodes.UNAUTHORIZED);
        } else {
          setStatus(statusCodes.UNKNOWN);
        }
      } finally {
        setIsUpdating(false);
      }
    };
    if (isUpdating) {
      update();
    }
  }, [isUpdating, setIsUpdating, setStatus]);
  return {
    update: () => setIsUpdating(true),
    updating: appLoading || isUpdating,
    status: status,
  };
};
