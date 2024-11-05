import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {AuthGuard} from "../auth/auth.guard";
import {Todo} from "./entities/todo.entity";
import {plainToClass} from "class-transformer";

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req: any) {
    const todo = this.todoService.create(+req.user.id, createTodoDto);
    return plainToClass(Todo, todo);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.todoService.findAll(+req.user.id);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.todoService.findOne(+id, +req.user.id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Request() req: any) {
    return this.todoService.update(+id,req.user.id,updateTodoDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Request() req: any) {
    return this.todoService.remove(+id, +req.user.id);
  }t
}
