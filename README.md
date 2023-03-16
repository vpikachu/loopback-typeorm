# loopback-typeorm

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

## Installation

Install packages using `npm`;

```sh
$ npm install loopback-typeorm reflect-metadata
```

Also you are required to install database drivers for your datasources. More info: https://typeorm.io/#installation

## Basic Use

Describe your entities. More info: https://typeorm.io/#step-by-step-guide

Create observer in `src/observers/my-typeorm.observer.ts`.

```ts
import {TypeOrmDataSource} from 'loopback-typeorm';

export class MyTypeOrmDataSource extends TypeOrmDataSource {}
```

If you have created your observer in different file like `src/observers/**.observer.ts`, be sure to manually register the observer in the application instance(https://loopback.io/doc/en/lb4/Life-cycle.html#register-a-life-cycle-observer).

Bind TypeORM connection options of your application instance:

```ts
//application.ts file...
import {MyTypeOrmDataSource} from 'observers/my-typeorm.observer';
//...
const myDSOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: false,
  entities: [
    //your entites...
  ],
  synchronize: true,
  logging: true,
};
this.bind(MyTypeOrmDataSource.BK_OPTIONS).to(myDSOptions);
//app.bind(MyTypeOrmDataSource.BK_OPTIONS).to(myDSOptions);
//...
```

Inject TypeORM datasource wherever you need using binding key `MyTypeOrmDataSource.BK_DATASOURCE`. Controller example:

```ts
//...
export class MyController {
  constructor(
    @inject(MyTypeOrmDataSource.BK_DATASOURCE)
    private myDatasource: DataSource,
  ) {}
//...
```

That's all. Now you are happy to play with TypeORM datasource ;)

## Examples

You can find examples of using this package in the source folder [/examples](https://github.com/vpikachu/loopback-typeorm/tree/main/examples)

## License

[Apache 2.0](https://github.com/vpikachu/loopback-typeorm/blob/main/LICENSE)
