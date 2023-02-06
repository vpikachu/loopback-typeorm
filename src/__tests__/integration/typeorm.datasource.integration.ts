import {Application} from '@loopback/core';
import {expect, givenHttpServerConfig} from '@loopback/testlab';
import {DataSource, DataSourceOptions} from 'typeorm';
import {TypeOrmDataSource} from '../../typeorm.datasource';

class TestDataSource extends TypeOrmDataSource {}

describe('TypeOrmDataSource', () => {
  const appConfig = givenHttpServerConfig({});
  const dsOptions: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [],
    synchronize: true,
    logging: false,
  };
  let app: Application;
  before('setup application', async () => {
    app = new Application(appConfig);
    app.lifeCycleObserver(TestDataSource);
    app.bind(TestDataSource.getOptionsBindingKey()).to(dsOptions);
    await app.start();
  });

  after(async () => {
    await app.stop();
    const datasource: DataSource = await app.get(
      TestDataSource.getDSBindingKey(),
    );
    expect(datasource.isInitialized).to.false();
  });

  it('Type ORM datasource connected', async () => {
    const datasource: DataSource = await app.get(
      TestDataSource.getDSBindingKey(),
    );
    expect(datasource.isInitialized).to.true();
  });
});
