<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Elasticsearch module for [Nest](https://github.com/nestjs/nest) based on the official [elasticsearch](https://www.npmjs.com/package/elasticsearch) package.

## Installation

```bash
$ npm i --save @nestjs/elasticsearch elasticsearch @types/elasticsearch
```

## Usage

Import `ElasticsearchModule`:

```typescript
@Module({
  imports: [ElasticsearchModule.register({
    host: 'localhost:9200',
    log: 'trace',
  })],
  providers: [...],
})
export class SearchModule {}
```

Inject `ElasticsearchService`:

```typescript
@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
}
```


## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**
```typescript
ElasticsearchModule.registerAsync({
  useFactory: () => ({
    host: 'localhost:9200',
    log: 'trace',
  }),
})
```
Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
ElasticsearchModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    host: configService.getString('ELASTICSEARCH_HOST'),
    log: 'trace',
  }),
  inject: [ConfigService],
}),
```

**2. Use class**
```typescript
ElasticsearchModule.registerAsync({
  useClass: ElasticsearchConfigService,
})
```
Above construction will instantiate `ElasticsearchConfigService` inside `ElasticsearchModule` and will leverage it to create options object.
```typescript
class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      host: 'localhost:9200',
      log: 'trace',
    };
  }
}
```

**3. Use existing**
```typescript
ElasticsearchModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```
It works the same as `useClass` with one critical difference - `ElasticsearchModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `ElasticsearchService` exposes native [elasticsearch](https://www.npmjs.com/package/elasticsearch) methods and wraps them in the Observable, [read more](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html). The `ElasticsearchModule.register()` takes `options` object as an argument, [read more](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

* Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
