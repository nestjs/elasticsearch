import { Inject, Injectable } from '@nestjs/common';
import { BulkIndexDocumentsParams, ClearScrollParams, Client, CountParams, CreateDocumentParams, DeleteDocumentByQueryParams, DeleteDocumentParams, DeleteScriptParams, ExistsParams, FieldStatsParams, GetParams, IndexDocumentParams, InfoParams, PingParams, SearchParams, UpdateDocumentByQueryParams, UpdateDocumentParams } from 'elasticsearch';
import { bindNodeCallback, Observable } from 'rxjs';
import { ELASTICSEARCH_CLIENT } from './elasticsearch-client.provider';

@Injectable()
export class ElasticsearchService {
  constructor(
    @Inject(ELASTICSEARCH_CLIENT) private readonly esClient: Client,
  ) {}

  getClient(): Client {
    return this.esClient;
  }

  clearScroll(params: ClearScrollParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.clearScroll),
    )(params);
  }

  ping(params: PingParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.ping),
    )(params);
  }

  search(params: SearchParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.search)
    )(params); 
  }

  count(params: CountParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.count),
    )(params);
  }

  create(params: CreateDocumentParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.create),
    )(params);
  }

  update(params: UpdateDocumentParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.update),
    )(params);
  }

  updateByQuery(params: UpdateDocumentByQueryParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.updateByQuery),
    )(params);
  }

  delete(params: DeleteDocumentParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.delete),
    )(params);
  }

  deleteByQuery(params: DeleteDocumentByQueryParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.deleteByQuery),
    )(params);
  }

  deleteScript(params: DeleteScriptParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.deleteScript),
    )(params);
  }

  exists(params: ExistsParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.exists),
    )(params);
  }

  bulk(params: BulkIndexDocumentsParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.bulk),
    )(params);
  }

  fieldStats(params: FieldStatsParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.fieldStats),
    )(params);
  }

  get(params: GetParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.get),
    )(params);
  }

  index<T>(params: IndexDocumentParams<T>): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.index),
    )(params);
  }

  info(params: InfoParams): Observable<any> {
    return bindNodeCallback(
      this.bindClientContext(this.esClient.info),
    )(params);
  }

  close() {
    return this.esClient.close();
  }

  bindClientContext<T extends Function>(fn: T): T {
    return fn.bind(this.esClient);
  }
}
