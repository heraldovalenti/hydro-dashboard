import streams from './streams.json';
const StreamRepository = {
  list: async () => streams,
};

export { StreamRepository };

export const fetchStreams = async () => {
  const result = await StreamRepository.list();
  return result;
};
