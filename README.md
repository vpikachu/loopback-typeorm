# loopback-typeorm

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

## Installation

Install packages using `npm`;

```sh
$ npm install loopback-typeorm reflect-metadata
```

Also you are required to install database drivers for your datasources. More info: https://typeorm.io/#installation

## Basic Use

1. Describe your entities. More info: https://typeorm.io/#step-by-step-guide

2. Create observer in `src/observers/my-typeorm.observer.ts`.

```ts
import {TypeOrmDataSource} from 'loopback-typeorm';

export class MyTypeOrmDataSource extends TypeOrmDataSource {}
```

3. Bind TypeORM connection options in you application class:

```ts
//...
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
  logging: false,
};
app.bind(MyTypeOrmDataSource.getOptionsBindingKey()).to(dsOptions);
//...
```

4. Inject TypeORM datasource wherever you need using binding key `MyTypeOrmDataSource.getDSBindingKey()`. Controller example:

```ts
//...
export class MyController {
  constructor(
    @inject(MyTypeOrmDataSource.getDSBindingKey())
    private myDatasource: DataSource,
  ) {}
//...
```

5. That's all. Now you are happy to play with TypeORM datasource ;)

## License

[Apache 2.0](https://github.com/vpikachu/loopback-typeorm/blob/main/LICENSE)
