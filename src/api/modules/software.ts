import service from '../http';

const softwareApi = {
  select: (name: string) => service.get(`/software/${name}`),
  listall: () => service.get(`/list/software`),
};

export default softwareApi;
