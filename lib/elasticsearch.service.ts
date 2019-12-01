import { Client, ClientOptions } from '@elastic/elasticsearch';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { ELASTICSEARCH_MODULE_OPTIONS } from './elasticsearch.constants';

@Injectable()
export class ElasticsearchService extends Client {
  constructor(
    @Optional() @Inject(ELASTICSEARCH_MODULE_OPTIONS) options: ClientOptions
  ) {
    super(options);
  }
}
