import { DynamicModule, Module } from '@nestjs/common';
import { ConfigOptions } from 'elasticsearch';
import { createElasticsearchClient } from './elasticsearch-client.provider';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  providers: [ElasticsearchService],
  exports: [ElasticsearchService]
})
export class ElasticsearchModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ElasticsearchModule,
      providers: [createElasticsearchClient(options)]
    };
  }
}
