import { Client, ConfigOptions } from 'elasticsearch';

export const ELASTICSEARCH_CLIENT = 'ELASTICSEARCH_CLIENT';

export const createElasticsearchClient = (options: ConfigOptions) => ({
  provide: ELASTICSEARCH_CLIENT,
  useFactory: () => {
    return new Client(options);
  },
});
