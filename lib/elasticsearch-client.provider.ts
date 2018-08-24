import { Client } from 'elasticsearch';
import { ELASTICSEARCH_MODULE_OPTIONS } from './elasticsearch.constants';
import { ElasticsearchModuleOptions } from './intefaces';

export const ELASTICSEARCH_CLIENT = 'ELASTICSEARCH_CLIENT';

export const createElasticsearchClient = () => ({
  provide: ELASTICSEARCH_CLIENT,
  useFactory: (options: ElasticsearchModuleOptions) => {
    return new Client(options);
  },
  inject: [ELASTICSEARCH_MODULE_OPTIONS]
});
