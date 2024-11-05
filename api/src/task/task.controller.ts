import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {AuthGuard} from "../auth/auth.guard";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post(':todoID')
  create(@Param('todoID') todoID: number ,@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.taskService.create(todoID, createTaskDto, +req.user.id);
  }
  @UseGuards(AuthGuard)
  @Patch(':todoID/:taskID')
  update(@Param('todoID') todoID: number, @Param('taskID') taskID: number, @Body() updateTaskDto: UpdateTaskDto, @Request() req: any) {
    return this.taskService.update(todoID, taskID, updateTaskDto, +req.user.id);
  }
  @UseGuards(AuthGuard)
  @Delete(':todoID/:taskID')
  remove(@Param('todoID') todoID: number, @Param('taskID') taskID: number, @Request() req: any) {
    return this.taskService.remove(todoID, taskID, +req.user.id);
  }
}
