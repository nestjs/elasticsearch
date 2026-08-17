import { Client } from '@elastic/elasticsearch';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { ELASTICSEARCH_MODULE_OPTIONS } from './elasticsearch.constants.js';
import type { ElasticsearchModuleOptions } from './interfaces/elasticsearch-module-options.interface.js';

@Injectable()
export class ElasticsearchService extends Client {
  constructor(
    @Optional()
    @Inject(ELASTICSEARCH_MODULE_OPTIONS)
    options: ElasticsearchModuleOptions
  ) {
    super(options);
  }
}
