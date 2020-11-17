import { streams } from './streams';

const StreamRepository = {
  list: async () => streams,
};

export { StreamRepository };

export const fetchStreams = async () => {
  const streams = await StreamRepository.list();
  return streams;
};
