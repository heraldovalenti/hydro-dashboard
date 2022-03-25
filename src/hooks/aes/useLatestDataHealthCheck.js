import { useState, useEffect } from 'react';
import { useAppData } from '../../providers/AppDataProvider';
import { latestDataHealthCheck } from '../../services/aes';
import { statusCodes } from './statusCodes';

export const useLatestDataHealthCheck = () => {
  const { loading: appLoading } = useAppData();
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState(statusCodes.NONE);
  useEffect(() => {
    const check = async () => {
      try {
        await latestDataHealthCheck();
        setStatus(statusCodes.OK);
      } catch (error) {
        if (error.response?.status === 403) {
          setStatus(statusCodes.UNAUTHORIZED);
        } else {
          setStatus(statusCodes.UNKNOWN);
        }
      } finally {
        setIsChecking(false);
      }
    };
    if (isChecking) {
      check();
    }
  }, [isChecking, setIsChecking, setStatus]);
  return {
    check: () => setIsChecking(true),
    loading: appLoading || isChecking,
    status: status,
  };
};
