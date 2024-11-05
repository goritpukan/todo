import {ForbiddenException, Injectable} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Todo} from "./entities/todo.entity";
import {Task} from "../task/entities/task.entity";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,) {}

  async create(ownerID: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo: Todo = new Todo();
    todo.name = createTodoDto.name;
    todo.ownerID = ownerID;
    const defaultTask = new Task();

    defaultTask.name = "task";
    defaultTask.completed = false;
    defaultTask.todo = todo;
    todo.tasks = [defaultTask];
    return await this.todoRepository.save(todo);
  }

  findAll(ownerID: number): Promise<Todo[]> {
    return this.todoRepository.findBy({ownerID});
  }
  async findOne(id: number, ownerID: number): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOneBy({id});
    if (todo.ownerID !== ownerID) throw new ForbiddenException("You dont have access to this edit-todo")
    return todo;
  }
  async update(id: number, ownerID: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOneBy({id});
    if (todo.ownerID !== ownerID) throw new ForbiddenException("You cant update this edit-todo")
    todo.name = updateTodoDto.name
    return this.todoRepository.save(todo);
  }

  async remove(id: number, ownerID: number): Promise<any> {
    const todo: Todo = await this.todoRepository.findOneBy({id});
    if (todo.ownerID !== ownerID) throw new ForbiddenException("You cant update this edit-todo")
    return this.todoRepository.delete(id);
  }
}
