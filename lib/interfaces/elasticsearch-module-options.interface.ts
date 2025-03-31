import { ClientOptions } from '@elastic/elasticsearch';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/**
 * @publicApi
 */
export type ElasticsearchModuleOptions = ClientOptions;

/**
 * @publicApi
 */
export interface ElasticsearchOptionsFactory {
  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions;
}

/**
 * @publicApi
 */
export interface ElasticsearchModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ElasticsearchOptionsFactory>;
  useClass?: Type<ElasticsearchOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions;
  inject?: any[];
}
