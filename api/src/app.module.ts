import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {User} from "./user/entity/user.entity"
import {Todo} from "./todo/entities/todo.entity"
import {Task} from "./task/entities/task.entity"
import { TodoModule } from './todo/todo.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: true,
    logging: true,
    entities: [User, Todo, Task],
      ssl: {
        rejectUnauthorized: false
      },
  }),
    AuthModule,
    UserModule,
    TodoModule,
    TaskModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
