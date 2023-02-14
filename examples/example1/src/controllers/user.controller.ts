// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, post, requestBody} from '@loopback/rest';
import {DataSource} from 'typeorm';
import {User} from '../models/user';
import {Example1DataSource} from '../observers/example1-datasource.observer';

export class UserController {
  constructor(
    @inject(Example1DataSource.getDSBindingKey())
    private myDatasource: DataSource,
  ) {}

  @get('/users')
  async getAll(): Promise<User[]> {
    return this.myDatasource
      .getRepository(User)
      .find({order: {lastName: 'ASC'}});
  }

  @post('/users')
  async post(@requestBody() body: User): Promise<User> {
    const repository = this.myDatasource.getRepository(User);
    const user = repository.create(body);
    await repository.save(user);
    return user;
  }
}
