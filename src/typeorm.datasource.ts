import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
} from '@loopback/core';
import {DataSource, DataSourceOptions} from 'typeorm';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver()
export class TypeOrmDataSource implements LifeCycleObserver {
  static getDSBindingKey(): string {
    return 'datasources.' + this.name;
  }
  static getOptionsBindingKey(): string {
    return 'options.' + this.name;
  }
  ds?: DataSource;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    const options: DataSourceOptions = await this.app.get(
      'options.' + this.constructor.name,
    );
    if (!options) throw Error('Connection options undefined.');
    this.ds = new DataSource(options);
    await this.ds.initialize();
    this.app.bind('datasources.' + this.constructor.name).to(this.ds);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    if (this.ds) await this.ds?.destroy();
  }
}
