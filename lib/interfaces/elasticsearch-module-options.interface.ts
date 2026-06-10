import { Client } from '@elastic/elasticsearch';
import type { ModuleMetadata, Type } from '@nestjs/common';

/**
 * @publicApi
 */
export type ElasticsearchModuleOptions = ConstructorParameters<typeof Client>[0];

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
