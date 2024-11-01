import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {TodoModule} from "../todo/todo.module";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TodoModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
