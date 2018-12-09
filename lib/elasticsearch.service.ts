import { Inject, Injectable } from '@nestjs/common';
import {
  BulkIndexDocumentsParams,
  ClearScrollParams,
  Client,
  CountParams,
  CountResponse,
  CreateDocumentParams,
  CreateDocumentResponse,
  DeleteDocumentByQueryParams,
  DeleteDocumentParams,
  DeleteDocumentResponse,
  DeleteScriptParams,
  ExistsParams,
  FieldStatsParams,
  FieldStatsResponse,
  GetParams,
  GetResponse,
  GetSourceParams,
  IndexDocumentParams,
  InfoParams,
  PingParams,
  SearchParams,
  SearchResponse,
  UpdateDocumentByQueryParams,
  UpdateDocumentByQueryResponse,
  UpdateDocumentParams
} from 'elasticsearch';
import { bindNodeCallback, Observable } from 'rxjs';
import { ELASTICSEARCH_CLIENT } from './elasticsearch-client.provider';

@Injectable()
export class ElasticsearchService {
  constructor(
    @Inject(ELASTICSEARCH_CLIENT) private readonly esClient: Client
  ) {}

  getClient(): Client {
    return this.esClient;
  }

  getSource(params: GetSourceParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.clearScroll))(
      params
    );
  }

  clearScroll(params: ClearScrollParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.clearScroll))(
      params
    );
  }

  ping(params: PingParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.ping))(params);
  }

  search<T = any>(params: SearchParams): Observable<SearchResponse<T>> {
    return (bindNodeCallback(this.bindClientContext(this.esClient.search))(
      params
    ) as any) as Observable<SearchResponse<T>>;
  }

  count(params: CountParams): Observable<CountResponse> {
    return (bindNodeCallback(this.bindClientContext(this.esClient.count))(
      params
    ) as any) as Observable<CountResponse>;
  }

  create(params: CreateDocumentParams): Observable<CreateDocumentResponse> {
    return (bindNodeCallback(this.bindClientContext(this.esClient.create))(
      params
    ) as any) as Observable<CreateDocumentResponse>;
  }

  update(params: UpdateDocumentParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.update))(
      params
    );
  }

  updateByQuery(
    params: UpdateDocumentByQueryParams
  ): Observable<UpdateDocumentByQueryResponse> {
    return (bindNodeCallback(
      this.bindClientContext(this.esClient.updateByQuery)
    )(params) as any) as Observable<UpdateDocumentByQueryResponse>;
  }

  delete(params: DeleteDocumentParams): Observable<DeleteDocumentResponse> {
    return (bindNodeCallback(this.bindClientContext(this.esClient.delete))(
      params
    ) as any) as Observable<DeleteDocumentResponse>;
  }

  deleteByQuery(
    params: DeleteDocumentByQueryParams
  ): Observable<DeleteDocumentByQueryParams> {
    return (bindNodeCallback(
      this.bindClientContext(this.esClient.deleteByQuery)
    )(params) as any) as Observable<DeleteDocumentByQueryParams>;
  }

  deleteScript(params: DeleteScriptParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.deleteScript))(
      params
    );
  }

  exists(params: ExistsParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.exists))(
      params
    );
  }

  bulk(params: BulkIndexDocumentsParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.bulk))(params);
  }

  fieldStats(params: FieldStatsParams): Observable<FieldStatsResponse> {
    return (bindNodeCallback(this.bindClientContext(this.esClient.fieldStats))(
      params
    ) as any) as Observable<FieldStatsResponse>;
  }

  get<T = any>(params: GetParams): Observable<GetResponse<T>> {
    return (bindNodeCallback(this.bindClientContext(this.esClient.get))(
      params
    ) as any) as Observable<GetResponse<T>>;
  }

  index<T>(params: IndexDocumentParams<T>): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.index))(
      params
    );
  }

  info(params: InfoParams): Observable<any> {
    return bindNodeCallback(this.bindClientContext(this.esClient.info))(params);
  }

  close() {
    return this.esClient.close();
  }

  bindClientContext<T extends Function>(fn: T): T {
    return fn.bind(this.esClient);
  }
}
