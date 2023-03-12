import { CreateUserEvent } from './create-user.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handleUserCreated-ANALYTICS', data);
    this.analytics.push({
      email: data.email,
      timestamp: new Date(),
      
    })

  }
}
