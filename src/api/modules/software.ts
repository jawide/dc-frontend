import service from '../http';

const softwareApi = {
  info: (name: string) => service.get(`/software/${name}/info`),
  select: (name: string) => service.get(`/software/${name}`),
  listall: () => service.get(`/list/software`),
  temp: (info: object) => service.post(`/software/temp`, info),
};

export default softwareApi;
