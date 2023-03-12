import { CreateUserEvent } from './create-user.event';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(CreateUserRequest.email),
    );

    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(CreateUserRequest.email),
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
